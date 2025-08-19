import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { cars } from "../data/cars";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatSession = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize the Gemini API and chat session
  useEffect(() => {
    const initializeChat = () => {
      try {
        const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
          setError(
            "Gemini API key not found. Please add REACT_APP_GEMINI_API_KEY to your .env file and restart the server."
          );
          return;
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash-latest",
        });

        const carList = JSON.stringify(
          cars.map((c) => ({
            id: c.id,
            brand: c.brand,
            model: c.model,
            price: c.price,
            gearbox: c.gearbox,
            fuel: c.fuel,
            specs: c.specs.map((s) => s.name).join(", "),
            equipment: c.equipment.join(", "),
          })),
          null,
          2
        );

        const systemInstructionText = `You are a friendly and expert car rental assistant. Your goal is to help the user find the perfect car based on their needs from the provided list.

        Instructions:
        1.  Analyze the user's request carefully.
        2.  Compare their request against the details of the available cars.
        3.  Recommend ONLY ONE car that is the best fit.
        4.  Provide a friendly, concise reason for your recommendation, referencing specific features (like price, gearbox, specs, or equipment) that match the user's request. The response should be in Markdown format.
        5.  Do not suggest any cars that are not in the list.

        Available Cars (JSON format):
        ${carList}`;

        chatSession.current = model.startChat({
          history: [
            { role: "user", parts: [{ text: "Hello" }] },
            {
              role: "model",
              parts: [
                {
                  text: "Hello! How can I help you find the perfect car today?",
                },
              ],
            },
          ],
          // Correctly formatted system instruction
          systemInstruction: {
            parts: [{ text: systemInstructionText }],
          },
        });

        setMessages([
          {
            from: "bot",
            text: "Hello! How can I help you find the perfect car today?",
          },
        ]);
        setError(null);
      } catch (e) {
        console.error("Initialization Error:", e);
        setError(
          "Failed to initialize the chatbot. Please check the console for details."
        );
      }
    };

    initializeChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatSession.current || error) return;

    const userMessage = userInput;
    const newMessages = [...messages, { from: "user", text: userMessage }];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true);

    try {
      const result = await chatSession.current.sendMessage(userMessage);
      const response = result.response;
      const text = response.text();
      setMessages([...newMessages, { from: "bot", text: text }]);
    } catch (err) {
      console.error("Error sending message to Gemini:", err);
      setMessages([
        ...newMessages,
        {
          from: "bot",
          text: "Sorry, something went wrong. Please check the console for details.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const isChatDisabled = isLoading || !!error;

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl btn-hover z-50"
        aria-label="Toggle chatbot"
      >
        <i className="fa-solid fa-robot"></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-0 right-0 left-0 h-[85vh] bg-white flex flex-col z-50 md:h-[28rem] md:w-96 md:bottom-28 md:right-8 md:left-auto md:rounded-lg md:shadow-xl">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="font-bold text-lg">Car Suggester Bot</h3>
            <button onClick={toggleChat} className="text-white text-2xl" aria-label="Close chat">
              &times;
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  msg.from === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    msg.from === "user" ? "bg-indigo-100" : "bg-gray-200"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {error && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-red-200 text-red-800">
                  {error}
                </span>
              </div>
            )}
            {isLoading && <div className="text-center">Bot is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={
                  error ? "Chat is disabled" : "e.g., 'a cheap automatic car'"
                }
                className="flex-1 p-2 border rounded-lg disabled:bg-gray-200"
                disabled={isChatDisabled}
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300"
                disabled={isChatDisabled}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

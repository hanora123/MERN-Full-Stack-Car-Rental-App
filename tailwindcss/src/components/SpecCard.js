import React from 'react';

const SpecCard = ({ spec }) => {
  return (
    <article className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4" title={spec.name}>
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
        {spec.iconType === 'image' ? (
          <img src={spec.icon} alt="" className="w-8 h-8" />
        ) : (
          <i className={`${spec.icon} text-2xl text-indigo-600`} aria-hidden="true"></i>
        )}
      </div>
      <div>
        <span className="block font-semibold text-gray-800">{spec.name}</span>
        <span className="block text-gray-600">{spec.value}</span>
      </div>
    </article>
  );
};

export default SpecCard;

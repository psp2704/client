import React from 'react';

function RequiredLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {children}
      <span className="text-red-500 ml-1">*</span>
    </label>
  );
}

export default RequiredLabel;

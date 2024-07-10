import React from 'react';

const InputField = ({
  name,
  value,
  label,
  placeholder,
  error,
  type = 'text',
  required,
  onChange,
  onBlur
}) => {
  return (
    <div className="mb-3">
      <label
        className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
        {label}
        {error && (
          <span className="text-error ms-3">
            {required && '*'}
            {error}
          </span>
        )}
      </label>
      <input
        className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;

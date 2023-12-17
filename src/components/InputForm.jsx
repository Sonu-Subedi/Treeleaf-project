import { useState } from "react";

const InputForm = ({
  id,
  label,
  errorMessage,
  onChange,
  options,
  required,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocused = () => {
    setFocused(true);
  };

  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^\d{7,10}$/;
    return !required || (value !== "" && phoneNumberRegex.test(value));
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !required || (value !== "" && emailRegex.test(value));
  };

  return (
    <div className={`form-input ${required ? "required" : ""}`}>
      <label>
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      {inputProps.type === "select" ? (
        <select
          {...inputProps}
          onChange={(e) => onChange(e)}
          onBlur={handleFocused}
          focused={focused.toString()}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...inputProps}
          type={
            inputProps.type === "text" && inputProps.name === "emailAddress"
              ? "email"
              : inputProps.type
          }
          onChange={(e) => {
            const { value } = e.target;

            if (
              inputProps.type === "number" &&
              inputProps.name === "phoneNumber" &&
              !validatePhoneNumber(value)
            ) {
              onChange({ target: { name: inputProps.name, value: "" } });
            } else if (inputProps.type === "email" && !validateEmail(value)) {
              onChange({ target: { name: inputProps.name, value: "" } });
            } else {
              onChange(e);
            }
          }}
          onBlur={handleFocused}
          focused={focused.toString()}
        />
      )}
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};

export default InputForm;

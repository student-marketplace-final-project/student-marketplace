import React, { useState } from "react";
import { Input } from "reactstrap";
import "../../Custom/textinput.scss";

function TextInput({
  type = "text",
  values,
  name,
  placeholder,
  errors,
  touched,
  defaultValue,
  handleChange,
  isPassword,
  isIcon = true,
  iconname,
}) {
  const isError = errors[name] && touched[name];
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="col-sm-12 col-lg-12 col-md-12 mb-10 has-wrapper ">
      {isIcon && (
        <span className="icon">
          <i className={iconname}></i>
        </span>
      )}

      <Input
        type={type}
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          paddingLeft: "40px",
        }}
        values={values}
        name={name}
        className={`pr-5 ${isError ? "border-danger" : ""}`}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
        type={showPassword ? "text" : type}
        defaultValue={defaultValue}
      ></Input>

      {isPassword && showPassword && (
        <span className="has-icon" style={{ marginRight: "20px" }}>
          <i className="ri-eye-line" onClick={() => setShowPassword(false)}></i>
        </span>
      )}

      {isPassword && !showPassword && (
        <span className="has-icon" style={{ marginRight: "20px" }}>
          <i
            className="ri-eye-off-line"
            onClick={() => setShowPassword(true)}
          ></i>
        </span>
      )}

      {isError && (
        <div
          style={{ fontSize: 14, marginLeft: 26 }}
          className="text-left mt-1 text-danger"
        >
          {errors[name]}
        </div>
      )}
    </div>
  );
}

export default TextInput;

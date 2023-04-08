import React from "react";
import './Login.css'

export const InputComponent = (props) => {
  const { nameInput } = props;
  return (
    <div class="input-div">
      <h2>{nameInput}</h2>
      <input type="text" class="input-com" />
    </div>
  );
};

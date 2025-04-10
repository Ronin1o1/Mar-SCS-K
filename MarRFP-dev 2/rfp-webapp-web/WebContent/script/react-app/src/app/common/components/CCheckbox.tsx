import React from "react";

function CCheckbox(props) {
  return (
    <input
      disabled={props?.disabled}
      type={props.type}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChangeHandler}
      checked={props.checked}
      className={props.class}
    />
  );
}

export default CCheckbox;

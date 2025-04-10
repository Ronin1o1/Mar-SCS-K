import React from "react";
import styled from "styled-components";

const HiddenInput = styled.input.attrs(props => ({
  type: "input"
}))`
  display: block;
  font-family: Arial;
  width: inherit;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  height: 23px;
  text-align: right;
  padding: 0px 5px 0px 0px;
  background-color: #ffffff;
  opacity: ${props => (props.disabled ? 0.4 : 0.87)};
  color: #333333;
  border: 1px solid #bababa;
`;

const BaseInputText = ({
  className,
  onKeyPress,
  id,
  onChange,
  onBlur,
  value,
  disabled,
  placeholder,
  type,
  onFocus,
  ...props
}) => (
  <HiddenInput
    id={id}
    className={className}
    onKeyPress={onKeyPress}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    disabled={disabled}
    placeholder={placeholder}
    type={type}
    onFocus={onFocus}
  />
);

export default BaseInputText;

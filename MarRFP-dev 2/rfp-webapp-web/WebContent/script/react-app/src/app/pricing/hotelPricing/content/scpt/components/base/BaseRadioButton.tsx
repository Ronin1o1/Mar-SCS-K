import React from "react";
import PropTypes, { string } from "prop-types";
import styled from "styled-components";

const RadioButtonContainer = styled.div`
  cursor: pointer;
  width: ${props => (props.size ? props.size : 18)}px;
  height: ${props => (props.size ? props.size : 18)}px;
  position: relative;
  display: inline-block;
  label {
    margin-left: 25px;
  }
  &::before {
    content: "";
    border-radius: 50%;
    border: 1px solid
      ${props => (props.borderColor ? props.borderColor : "#BABABA")};
    background: ${props =>
      props.backgroundColor ? props.backgroundColor : "#FFFFFF"};
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    pointer-events: none;
    z-index: 0;
  }
`;

const Fill = styled.div`
  background: ${props => (props.fillColor ? props.fillColor : "#000000")};
  width: 0;
  height: 0;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease-in, height 0.2s ease-in;
  pointer-events: none;
  z-index: 1;
`;

const Input = styled.input`
  opacity: 0;
  z-index: 2;
  position: inherit;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:checked {
    & ~ ${Fill} {
      width: 50%;
      height: 50%;
      transition: width 0.2s ease-out, height 0.2s ease-out;
      opacity: ${props => (props.disabled ? 0.4 : 1)};
      &::before {
        opacity: 1;
        transition: opacity 1s ease;
      }
    }
  }
`;

const BaseRadioButton = ({
  onChange,
  value,
  name,
  disabled,
  id,
  checked,
  ...props
}) => (
  <RadioButtonContainer>
    <Input
      type="radio"
      onChange={onChange}
      name={name}
      value={value}
      disabled={disabled}
      id={id}
      checked={checked}
    />
    <Fill />
  </RadioButtonContainer>
);

export default BaseRadioButton;

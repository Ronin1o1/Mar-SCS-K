import React from "react";
import styled from "styled-components";

const HiddenInput = styled.input.attrs(props => ({
  type: "hidden"
}))`
  display: block;
  font-family: Arial;
  width: auto;
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
  opacity: 0.87;
  color: #333333;
  border: 1px solid #bababa;
`;

const BaseInputText = ({ className, id, value, ...props }) => (
  <HiddenInput id={id} className={className} value={value} />
);

export default BaseInputText;

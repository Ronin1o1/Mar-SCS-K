import React from "react";
import styled from "styled-components";

const HiddenSelect = styled.select`
  display: block;
  color: #333333;
  line-height: 1.3;
  width: 100%;
  max-width: 100%;
  height: 25px;
  box-sizing: border-box;
  margin: 0;
  padding-left: 5px;
  font-size: 13px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #ffffff;
  border: 1px solid #bababa;
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-down' class='svg-inline--fa fa-chevron-down fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='rgb(51,51,51)' d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.85em 0.95em, 100%;
  opacity: 0.87;
  :disabled {
    opacity: 0.4;
  }
  option:hover {
    background-color: #bababa;
  }
`;

const BaseSelect = ({
  className,
  checked,
  id,
  onBlur,
  onChange,
  labelData,
  value,
  disabled,
  ...props
}) => (
  <HiddenSelect
    id={id}
    value={value}
    onBlur={onBlur}
    onChange={onChange}
    disabled={disabled}
  >
    {labelData.map((label, index) => (
      <option key={index}>{label}</option>
    ))}
  </HiddenSelect>
);

export default BaseSelect;

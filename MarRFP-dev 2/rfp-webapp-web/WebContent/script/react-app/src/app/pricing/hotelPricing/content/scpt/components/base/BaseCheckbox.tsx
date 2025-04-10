import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: grey;
  stroke-width: 4px;
`;

const HiddenCheckbox = styled.input.attrs(props => ({
  type: "checkbox"
}))`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div.attrs(props => ({
  checked: props.checked || false
}))`
  width: 16px;
  height: 16px;
  line-height: 10px;
  background: ${props => (props.checked ? "#FFFFFF" : "#FFFFFF")};
  border: ${props =>
    props.checked ? "1px solid #BABABA" : "1px solid #BABABA"};
  border-radius: 1px;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
`;

const BaseCheckbox = ({ className, checked, disabled, onClick, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox
      checked={checked}
      disabled={disabled}
      onClick={onClick}
      {...props}
    />
    <StyledCheckbox checked={checked} disabled={disabled}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default BaseCheckbox;

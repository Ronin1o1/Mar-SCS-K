import styled from "styled-components";

const Button = styled.button.attrs(props => ({}))`
  background: #a2bdd0;
  border-radius: 1px;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 0px 17px 0px 17px;
  height: 25px;
  cursor: pointer;
  font-family: Segoe UI;
  font-size: 12px;
  :hover {
    background: #ebebeb;
  }
`;

export default Button;

import React from "react";
import styled from "styled-components";

//전체 button style

const StyledButton = styled.button`
  width: 99px;
  height: 32px;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  padding: 0 8px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  font-size: 16px;
  color: white;
  border-radius: 8px;

  &.grey {
    background-color: #808183;
    border: 1px solid #808183;
  }

  &.purple {
    background-color: #8276f4;
    border: 1px solid #8276f4;
  }
`;

function Button(props) {
  const { title, onClick, className } = props;
  return (
    <StyledButton onClick={onClick} className={className}>
      {title || "button"}
    </StyledButton>
  );
}

export default Button;

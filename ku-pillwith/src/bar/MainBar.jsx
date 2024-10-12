import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.png";
import Button from "../components/Button";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  justify-content: space-between;
  padding: 22px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-right: 22px;
  gap: 10px;
`;

const LogoImage = styled.div`
  width: 205px;
  height: 38px;
  background-image: url(${(props) => props.image});
  background-size: cover; /* 또는 contain */
  background-position: center;
  margin-left: 22px;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    opacity: 1;
  }

  &:hover {
    text-decoration: underline;
  }
`;

//[todo] : mainbar 퍼블리싱 및 onclick event
function MainBar() {
  return (
    <Container>
      <NavItem to="/" exact>
        <LogoImage image={Logo}></LogoImage>
      </NavItem>
      <ButtonContainer>
        <NavItem to="/login">
          <Button title="로그인" className="grey"></Button>
        </NavItem>
        <NavItem to="/register">
          <Button title="회원가입" className="purple"></Button>
        </NavItem>
      </ButtonContainer>
    </Container>
  );
}

export default MainBar;

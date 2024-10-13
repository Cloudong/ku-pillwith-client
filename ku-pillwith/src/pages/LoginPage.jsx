import React, { useState } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import Button from "../components/Button";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const LoginForm = styled.form`
  width: 320px;
  height: 276px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 16px auto;
  border: 1px solid #d9d9d9;
  padding: 26px 32px 32px;
  border-radius: 8px;
`;

const InputContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;
  font-size: 18px;
  font-weight: 400;
`;

const InputField = styled.input`
  display: block;
  width: 240px;
  height: 16px;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;

  &:focus {
    outline: 3px auto grey;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <MainBar />
      <LoginForm onSubmit={() => {}}>
        <InputContainer>
          <Text>아이디</Text>
          <InputField
            label="아이디"
            value={id}
            placeholder="아이디를 입력해주세요"
            onChange={(e) => setId(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Text>비밀번호</Text>
          <InputField
            label="비밀번호"
            value={password}
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <Button title="로그인" className="grey" />
      </LoginForm>
    </Container>
  );
}

export default LoginPage;

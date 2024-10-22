import React, { useState } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const RegisterForm = styled.form`
  width: 320px;
  height: 380px;
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

function RegisterPage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://3.39.227.185:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id, password, name: name }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.log(id + " " + name + " " + password);
        console.error("Register error");
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <Container>
      <MainBar />
      <RegisterForm onSubmit={handleRegister}>
        <InputContainer>
          <Text>닉네임</Text>
          <InputField
            label="닉네임"
            value={name}
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>
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
        <Button title="회원가입" className="purple" />
      </RegisterForm>
    </Container>
  );
}

export default RegisterPage;

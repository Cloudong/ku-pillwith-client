import React, { useState } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import Button from "../components/Button";
import { useUser } from "../api/UserContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const MyPageForm = styled.form`
  width: 320px;
  height: 276px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px auto;
  gap: 30px;
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

function MyPage() {
  const [name, setName] = useState("");
  const { logout } = useUser();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "http://3.39.227.185:3001/api/auth/update-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ new_name: name }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      navigate("/");
      window.location.reload();
      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <MainBar />
      <MyPageForm onSubmit={handleSubmit}>
        <InputContainer>
          <Text>닉네임 수정하기</Text>
          <InputField
            label="닉네임"
            value={name}
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>
        <Button title="프로필 수정 완료" className="grey" />
        <Button
          title="로그아웃"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="red"
        />
      </MyPageForm>
    </Container>
  );
}

export default MyPage;

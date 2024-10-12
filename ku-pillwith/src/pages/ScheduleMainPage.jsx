import React from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;

  &.title {
    font-size: 40px;
    font-weight: 700;
    padding-top: 40px;
    padding-bottom: 8px;
  }

  &.sub {
    color: #757575;
    font-size: 28px;
    font-weight: 400;
    padding-bottom: 40px;
  }

  &.type {
    color: #8276f4;
    font-size: 37px;
    font-weight: 700;
    padding-top: 50px;
  }
`;

function ScheduleMainPage() {
  const navigator = useNavigate();
  return (
    <Container>
      <MainBar />
      <Text className="title">복용 일정 관리하기</Text>
      <Text className="sub">수정하고 싶은 일정을 선택해주세요</Text>
      <Text
        className="type"
        onClick={() => {
          navigator("/schedule/morning");
        }}
      >
        아침
      </Text>
      <Text
        className="type"
        onClick={() => {
          navigator("/schedule/afternoon");
        }}
      >
        점심
      </Text>
      <Text
        className="type"
        onClick={() => {
          navigator("/schedule/evening");
        }}
      >
        저녁
      </Text>
    </Container>
  );
}

export default ScheduleMainPage;

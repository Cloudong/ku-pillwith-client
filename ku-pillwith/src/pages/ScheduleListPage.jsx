import React from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ScheduleItem from "../components/ScheduleItem";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TimeText = {
  morning: "아침",
  afternoon: "점심",
  evening: "저녁",
};

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
    padding-bottom: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

function ScheduleListPage() {
  const { time } = useParams();
  const navigator = useNavigate();
  const Title = `${TimeText[time]} 일정 관리하기`;

  return (
    <Container>
      <MainBar />
      <Text className="title">{Title}</Text>
      <Text className="sub">
        추가하거나 삭제하고 싶은 의약품을 선택해주세요
      </Text>
      <ScheduleItem />
      <ButtonContainer>
        <Button
          title="추가하기"
          onClick={() => {
            navigator("/schedule/search");
          }}
          className="green"
        />
        <Button
          title="완료"
          onClick={() => {
            navigator("/");
          }}
          className="grey"
        />
      </ButtonContainer>
    </Container>
  );
}

export default ScheduleListPage;

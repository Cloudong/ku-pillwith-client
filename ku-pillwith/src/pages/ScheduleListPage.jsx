import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ScheduleItem from "../components/ScheduleItem";
import { useUser } from "../api/UserContext";

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
  const [schedules, setSchedules] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const Title = `${time} 일정 관리하기`;

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!user) {
        console.log("user not logged in");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3001/schedule/schedules",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        const filtereddata = data.schedules.filter(
          (schedule) => schedule.type === time
        );
        setSchedules(filtereddata);
        console.log(schedules);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchSchedule();
  }, [user]);

  return (
    <Container>
      <MainBar />
      <Text className="title">{Title}</Text>
      <Text className="sub">
        추가하거나 삭제하고 싶은 의약품을 선택해주세요
      </Text>
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <ScheduleItem
            key={schedule.id}
            id={schedule.id}
            name={schedule.pill_item_name}
            type={schedule.pill_type}
            dosage={schedule.pill_dosage}
            imgUrl={schedule.pill_imgurl}
          />
        ))
      ) : (
        <p>추가된 일정이 없습니다.</p>
      )}
      <ButtonContainer>
        <Button
          title="추가하기"
          onClick={() => {
            navigate(`/schedule/${time}/search`);
          }}
          className="green"
        />
        <Button
          title="완료"
          onClick={() => {
            navigate("/");
          }}
          className="grey"
        />
      </ButtonContainer>
    </Container>
  );
}

export default ScheduleListPage;

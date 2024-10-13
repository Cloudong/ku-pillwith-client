import React from "react";
import styled from "styled-components";
import LandingImg from "../assets/Landing_main.png";
import Landing_1 from "../assets/Landing_1.png";
import Landing_2 from "../assets/Landing_2.png";
import MainBar from "../bar/MainBar";
import Button from "../components/Button";
import { useUser } from "../api/UserContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: calc(100%);
  height: 500px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  background-color: #fbfbfb;
  padding: 40px 0;
  border-bottom: 0.3px black solid;
`;

const ScheduleWrapper = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  background-color: #fbfbfb;
  padding: 40px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;

  &.main {
    height: 500px;
    background-image: url(${LandingImg});
    background-size: cover; /* 또는 contain */
    background-position: center;
    color: white;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    text-align: right;
    padding-right: 40px;
  }

  &.article1 {
    height: 500px;
    color: black;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    padding-left: 40px;
  }

  &.article2 {
    height: 500px;
    color: black;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    text-align: right;
    padding-right: 40px;
  }

  &.user {
    height: 150px;
    color: black;
    flex-direction: column;
    text-align: left;
  }
`;

const UserContainer = styled.div`
  min-height: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;

  &.title {
    font-size: 48px;
    font-weight: 700;
  }
  &.mainsub {
    font-size: 24px;
    font-weight: 400;
  }

  &.sub {
    font-size: 24px;
    font-weight: 400;
    color: #757575;
  }

  &.type {
    color: #8276f4;
    font-size: 32px;
    font-weight: 700;
  }
`;

const Image = styled.div`
  width: 480px;
  height: 493px;
  background-image: url(${(props) => props.image});
  background-size: cover; /* 또는 contain */
  background-position: center;
  margin: 0 40px;
`;

function LandingPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const MainTitle = "우리 가족 의약품\n복용 일정 관리";
  const MainSubTitle =
    "약을 시간 맞춰 잘 복용하고 계신가요?\n이제 쉽고, 편리하게\nKU_PILLWITH로 관리하세요.";
  const ScheduleTitle = "스마트한 의약품\n복용 일정 관리";
  const ScheduleSubTitle =
    "만성질환 약물 치료의 첫 단계는 꾸준한 약 복용입니다.\n필위드(PILLWITH)가 여러분들의\n꾸준한 약 복용을 도와드리겠습니다.";

  const MedicineTitle = "내가 먹는\n의약품 알아보기";
  const MedicineSubTitle =
    "내가 먹는 약물의 정보를 알아가는 것은\n질병 치료의 첫번째 단계입니다.\n필위드(PILLWITH)가 여러분들의\n건강 관리를 체계적으로 도와드리겠습니다.";

  const LoginMainTitle = `안녕하세요,\n${user ? user.name : "사용자"}님`;
  const LoginMainSubTitle =
    "약을 정해진 시간에 잘 복용하고 계신가요?\n이제 쉽고, 편리하게\nKU_PILLWITH로 관리하세요";

  return (
    <Container>
      <MainBar />
      {user ? (
        <>
          <TextContainer className="main">
            <Text className="title">{LoginMainTitle}</Text>
            <Text className="mainsub">{LoginMainSubTitle}</Text>
            <ButtonContainer>
              <Button
                title="복용 일정 등록하기"
                onClick={() => {
                  navigate("/schedule");
                }}
                className="lightgrey"
              />
              <Button
                title="의약품 검색하기"
                onClick={() => {
                  navigate("/search");
                }}
                className="black"
              />
            </ButtonContainer>
          </TextContainer>
          <ScheduleWrapper>
            <UserContainer>
              <TextContainer className="user">
                <Text className="title">나의 복용 의약품</Text>
                <Text className="sub">복용 일정을 관리해보세요</Text>
              </TextContainer>
              <Button
                title="복용 일정 수정하기"
                onClick={() => {
                  navigate("/schedule");
                }}
                className="grey"
              />
            </UserContainer>
            <UserContainer>
              <Text className="type">아침</Text>
              <Text className="type">점심</Text>
              <Text className="type">저녁</Text>
            </UserContainer>
            {/* [todo] : 사용자 복용 일정 표시하기 */}
          </ScheduleWrapper>
        </>
      ) : (
        <>
          <TextContainer className="main">
            <Text className="title">{MainTitle}</Text>
            <Text className="mainsub">{MainSubTitle}</Text>
            <Button
              title="KU_PILLWITH 사용하러 가기"
              onClick={() => {
                navigate("/login");
              }}
              className="lightgrey"
            />
          </TextContainer>
          <ContentWrapper>
            <TextContainer className="article1">
              <Text className="title">{ScheduleTitle}</Text>
              <Text className="sub">{ScheduleSubTitle}</Text>
            </TextContainer>
            <Image image={Landing_2}></Image>
          </ContentWrapper>
          <ContentWrapper>
            <Image image={Landing_1}></Image>
            <TextContainer className="article2">
              <Text className="title">{MedicineTitle}</Text>
              <Text className="sub">{MedicineSubTitle}</Text>
            </TextContainer>
          </ContentWrapper>
        </>
      )}
    </Container>
  );
}

export default LandingPage;

import React from "react";
import styled from "styled-components";
import MedicineImg from "../assets/ScheduleItem.png";

const Container = styled.div`
  width: 320px;
  height: 79px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
`;

const Image = styled.div`
  width: 110px;
  height: 61px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 4px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;

  &.title {
    font-size: 13px;
    font-weight: 700;
  }

  &.sub {
    font-size: 13px;
    font-weight: 400;
  }

  &.dosage {
    font-size: 10px;
    font-weight: 400;
    color: #979797;
  }
`;

function LandingScheduleItem(props) {
  const { id, name, type, dosage, imgUrl } = props;

  return (
    <Container>
      <DescriptionContainer>
        <Image image={imgUrl ? imgUrl : MedicineImg}></Image>
        <TextContainer>
          <Text className="title">{name ? name : "약 이름"}</Text>
          <Text className="sub">{type ? type : "약 종류"}</Text>
          <Text className="dosage">{dosage ? dosage : "복용량"}</Text>
        </TextContainer>
      </DescriptionContainer>
    </Container>
  );
}

export default LandingScheduleItem;

import React from "react";
import styled from "styled-components";
import Button from "./Button";
import MedicineImg from "../assets/ScheduleItem.png";

const Container = styled.div`
  width: 665px;
  height: 79px;
  padding: 30px 0;
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
  width: 147px;
  height: 80px;
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
    font-size: 20px;
    font-weight: 700;
  }

  &.sub {
    font-size: 18px;
    font-weight: 400;
  }

  &.dosage {
    font-size: 18px;
    font-weight: 400;
    color: #979797;
  }
`;

//[todo] : 삭제 버튼 클릭 후 사용자 일정 목록에서 제외 기능 구현
function ScheduleItem(props) {
  const { id, name, type, dosage, imgUrl, onDelete } = props;

  const handleDelete = () => {
    onDelete(id);
  };

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
      <Button title="삭제" onClick={handleDelete} className="red" />
    </Container>
  );
}

export default ScheduleItem;

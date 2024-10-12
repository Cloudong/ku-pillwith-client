import React from "react";
import styled from "styled-components";
import MedicineImg from "../assets/MedicineItem.png";

const Container = styled.div`
  width: calc(100%);
  height: 124px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgWrapper = styled.div`
  width: 150px;
  height: 95px;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${(props) => props.image});
  background-size: cover; /* 또는 contain */
  background-position: center;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  text-align: right;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
  white-space: pre-wrap;

  &.title {
    font-size: 24px;
    font-weight: 700;
  }

  &.sub {
    font-size: 20px;
    font-weight: 400;
    color: #757575;
  }
`;

function MedicineItem(props) {
  const { name, type, imgUrl } = props;

  return (
    <Container>
      <ImgWrapper>
        <Image image={imgUrl ? imgUrl : MedicineImg}></Image>
      </ImgWrapper>
      <TextContainer>
        <Text className="title">{name ? name : "약 이름"}</Text>
        <Text className="sub">{type ? type : "약 정보"}</Text>
      </TextContainer>
    </Container>
  );
}

export default MedicineItem;

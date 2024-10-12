import React from "react";
import styled from "styled-components";
import MedicineImg from "../assets/MedicineItem.png";
import { useNavigate } from "react-router-dom";

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
  background-size: cover;
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

//[todo] : medicineItem 클릭이벤트 -> medicine page로 이동
function MedicineItem(props) {
  const { id, name, type, imgUrl } = props;
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/medicine/${id}`);
      }}
    >
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

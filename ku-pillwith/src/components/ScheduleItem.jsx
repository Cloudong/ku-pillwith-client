import React, { useState } from "react";
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
`;

const Image = styled.div`
  width: 147px;
  height: 79px;
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

const EditableText = styled.div`
  cursor: pointer;
`;

const InputField = styled.input`
  display: block;
  width: 169px;
  height: 21px;
  padding-left: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;

  &:focus {
    outline: 3px auto #8276f4;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

//[todo] : 삭제 버튼 클릭 후 사용자 일정 목록에서 제외 기능 구현
function ScheduleItem(props) {
  const { name, type, imgUrl } = props;
  const [dosage, setDosage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setDosage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <Container>
      <DescriptionContainer>
        <Image image={imgUrl ? imgUrl : MedicineImg}></Image>
        <TextContainer>
          <Text className="title">{name ? name : "약 이름"}</Text>
          <Text className="sub">{type ? type : "약 종류"}</Text>
          {isEditing ? (
            <InputField
              value={dosage}
              placeholder="복용량을 입력해주세요"
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              autoFocus
            />
          ) : (
            <EditableText onClick={handleTextClick}>
              <Text className="dosage">
                {dosage
                  ? `${dosage}밀리그램`
                  : "복용량을 입력해주세요(밀리그램)"}
              </Text>
            </EditableText>
          )}
        </TextContainer>
      </DescriptionContainer>
      <Button title="삭제" className="red" />
    </Container>
  );
}

export default ScheduleItem;

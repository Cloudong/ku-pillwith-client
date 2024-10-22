import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useUser } from "../api/UserContext";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const FieldContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputField = styled.input`
  display: block;
  width: 240px;
  height: 16px;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-bottom: 20px;

  &:focus {
    outline: 3px auto grey;
    outline-offset: 2px;
    border-color: transparent;
  }
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

  &.label {
    padding: 10px 0;
    font-size: 18px;
    font-weight: 400;
  }
`;
const SelectField = styled.select`
  display: block;
  width: 270px;
  padding: 10px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-bottom: 50px;

  &:focus {
    outline: 3px auto #8276f4;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

//[todo] : medicine_id로 medicine 정보 받아오기
//[todo] : 복용량 -> 텍스트 입력 / 복용단위 -> 드롭다운 입력으로 받기
//[todo] : 추가하기 버튼 누르면 복용량, 복용단위, user 정보 포함해서 일정 정보 저장(api 통신) -> 목록 페이지로 돌아감
function ScheduleDosagePage(props) {
  const { time, id } = useParams();
  const { user } = useUser();
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState();
  const [unit, setUnit] = useState("mg");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(time, id);
    const fetchMedicine = async () => {
      try {
        const response = await fetch(
          `http://3.39.227.185:3001/api/pills/${id}`
        ); // API 요청
        const data = await response.json();
        setMedicine(data);
      } catch (error) {
        console.error("Error fetching medicine details:", error);
      }
    };

    fetchMedicine();
  }, [id]);

  const handleSubmit = async () => {
    const scheduleData = {
      user_id: user.id,
      type: time,
      pill_id: Number(id),
      pill_item_name: medicine.item_name,
      pill_imgurl: medicine.big_prdt_img_url,
      pill_dosage: `${dosage}${unit}`,
      pill_type: medicine.product_type,
    };

    try {
      const response = await fetch(
        "http://3.39.227.185:3001/api/schedule/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scheduleData),
        }
      );

      if (response.ok) {
        navigate(`/schedule/${time}`);
      } else {
        console.error("Failed to save schedule");
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  return (
    <Container>
      <MainBar />
      <Text className="title">{medicine.item_name}</Text>
      <Text className="sub">{medicine.product_type}</Text>
      <FieldContainer>
        <Text className="label">복용량</Text>
        <InputField
          label="복용량"
          value={dosage}
          placeholder="숫자로 입력해주세요"
          onChange={(e) => setDosage(e.target.value)}
        />
      </FieldContainer>
      <FieldContainer>
        <Text className="label">복용단위</Text>
        <SelectField value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="밀리그램">밀리그램</option>
          <option value="정">정</option>
          <option value="포">포</option>
        </SelectField>
      </FieldContainer>
      <Button title="추가하기" onClick={handleSubmit} className="green" />
    </Container>
  );
}

export default ScheduleDosagePage;

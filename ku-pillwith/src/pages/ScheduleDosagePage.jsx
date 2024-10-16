import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

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
  const { medicine_id } = useParams();

  //퍼블리싱을 위한 임시 초기데이터
  const [medicine, setMedicine] = useState({
    name: "타이레놀정500밀리그람(아세트아미노펜)",
    ingr_name: "아세트아미노펜",
    imgUrl: null,
    type: "[01140]해열.진통.소염제",
    ee: "감기로 인한 발열 및 동통(통증), 두통뿐만 아니라 신경통, 근육통, 월경통, 염좌통(삔통증)",
    ud: "만 12세 이상 소아 및 성인: 1회 1~2정씩 1일 3-4회 (4-6시간 마다) 필요시 복용한다. 1일 최대 4그램 (8정)을 초과하여 복용하지 않는다. 이 약은 가능한 최단기간동안 최소 유효용량으로 복용한다.",
    nb: "만 12세 이상 소아 및 성인: 1회 1~2정씩 1일 3-4회 (4-6시간 마다) 필요시 복용한다. 1일 최대 4그램 (8정)을 초과하여 복용하지 않는다. 이 약은 가능한 최단기간동안 최소 유효용량으로 복용한다.",
  });
  const [dosage, setDosage] = useState();
  const [unit, setUnit] = useState("mg");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(`/medicines/${medicine_id}`);
        const data = await response.json();
        setMedicine(data);
      } catch (error) {
        console.error("Error fetching medicine details:", error);
      }
    };

    fetchMedicine();
  }, [medicine_id]);

  const handleSubmit = async () => {
    const scheduleData = { dosage: `${dosage}${unit}`, medicine_id };

    try {
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        navigate("/schedule");
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
      <Text className="title">{medicine.name}</Text>
      <Text className="sub">{medicine.type}</Text>
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

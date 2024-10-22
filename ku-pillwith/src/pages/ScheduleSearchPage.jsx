import React, { useState } from "react";
import styled from "styled-components";
import MainBar from "../bar/MainBar";
import { FiSearch } from "react-icons/fi";
import MedicineItem from "../components/MedicineItem";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 917px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputField = styled.input`
  display: block;
  width: 830px;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 100px;
  padding-left: 20px;
  font-size: 16px;

  &:focus {
    outline: 3px auto grey;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

const MedicineContainer = styled.div`
  width: 800px;
  margin-top: 40px;
`;

//[todo] : 일정 관리->약 검색 페이지
//[todo] : 약 아이템 클릭-> 복용량 수정 페이지 이동

function ScheduleSearchPage() {
  const { time } = useParams();
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);

  const handleSearch = async () => {
    if (search.trim() === "") return;
    try {
      const response = await fetch(
        `http://3.39.227.185:3001/api/pills/search?query=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  return (
    <Container>
      <MainBar />
      <InputContainer>
        <InputField
          label="검색창"
          value={search}
          placeholder="약 이름을 입력해주세요"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FiSearch size="48" onClick={handleSearch} />
      </InputContainer>
      <MedicineContainer>
        {Array.isArray(medicines) && medicines.length > 0 ? (
          medicines.map((medicine) => (
            <MedicineItem
              key={medicine.id}
              id={medicine.id}
              name={medicine.item_name}
              type={medicine.product_type}
              imgUrl={medicine.big_prdt_img_url}
              page="schedule"
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </MedicineContainer>
    </Container>
  );
}

export default ScheduleSearchPage;

import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import MainBar from "../bar/MainBar";
import MedicineItem from "../components/MedicineItem";

//[todo] : 의약품 검색 페이지 퍼블리싱

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
    padding-bottom: 40px;
  }
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

//[todo] : 의약품 정보 불러오기
function SearchPage() {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);

  const handleSearch = async () => {
    if (search.trim() === "") return;
    try {
      const response = await fetch(
        `http://3.39.227.185:3001/pills/search?query=${encodeURIComponent(search)}`
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
      <Text className="title">의약품 검색하기</Text>
      <Text className="sub">의약품 이름으로 검색해주세요</Text>
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
              page="search"
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </MedicineContainer>
    </Container>
  );
}

export default SearchPage;

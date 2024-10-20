import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MedicineImg from "../assets/MedicineItem.png";
import MainBar from "../bar/MainBar";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
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

  &.effectTitle {
    font-size: 24px;
    font-weight: 600;
  }

  &.effectSub {
    color: #d53d3d;
    font-size: 22px;
    font-weight: 400;
  }

  &.ddTitle {
    color: #8276f4;
    font-size: 32px;
    font-weight: 700;
    padding-top: 10px;
  }

  &.ddSub {
    font-size: 24px;
    font-weight: 400;
    padding-top: 8px;
    padding-bottom: 40px;
  }
`;

const EffetTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 0;
  align-items: center;
`;

const DescriptionTextContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Image = styled.div`
  width: 500px;
  height: 272px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

function MedicinePage() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(`http://localhost:3001/pills/${id}`); // API 요청
        const data = await response.json();
        setMedicine(data);
      } catch (error) {
        console.error("Error fetching medicine details:", error);
      }
    };

    fetchMedicine();
  }, [id]);

  if (!medicine) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MainBar />
      <Text className="title">{medicine.item_name}</Text>
      <Text className="sub">{medicine.item_ingr_name}</Text>
      <Image
        image={
          medicine.big_prdt_img_url ? medicine.big_prdt_img_url : MedicineImg
        }
      ></Image>
      <EffetTextContainer>
        <Text className="effectTitle">약품 효능 : </Text>
        <Text className="effectSub">
          {medicine.product_type
            ? medicine.product_type
            : "기재된 효능이 없습니다."}
        </Text>
      </EffetTextContainer>
      <DescriptionTextContainer>
        <Text className="ddTitle">효능효과</Text>
        <Text className="ddSub">
          {medicine.ee_doc_data
            ? medicine.ee_doc_data
            : "기재된 효능효과가 없습니다"}
        </Text>
      </DescriptionTextContainer>
      <DescriptionTextContainer>
        <Text className="ddTitle">용법용량</Text>
        <Text className="ddSub">
          {medicine.ud_doc_data
            ? medicine.ud_doc_data
            : "기재된 용법용량이 없습니다"}
        </Text>
      </DescriptionTextContainer>
      <DescriptionTextContainer>
        <Text className="ddTitle">사용 상의 주의사항</Text>
        <Text className="ddSub">
          {medicine.nb_doc_data
            ? medicine.nb_doc_data
            : "기재된 주의사항이 없습니다"}
        </Text>
      </DescriptionTextContainer>
    </Container>
  );
}

export default MedicinePage;

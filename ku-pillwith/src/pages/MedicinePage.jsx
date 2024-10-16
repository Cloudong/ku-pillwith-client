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

const ImgWrapper = styled.div`
  width: 500px;
  height: 316px;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

function MedicinePage() {
  const { id } = useParams();

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

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(`/medicines/${id}`); // API 요청
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
      <Text className="title">{medicine.name}</Text>
      <Text className="sub">{medicine.ingr_name}</Text>
      <ImgWrapper>
        <Image image={medicine.imgUrl ? medicine.imgUrl : MedicineImg}></Image>
      </ImgWrapper>
      <EffetTextContainer>
        <Text className="effectTitle">약품 효능 : </Text>
        <Text className="effectSub">
          {medicine.type ? medicine.type : "기재된 효능이 없습니다."}
        </Text>
      </EffetTextContainer>
      <DescriptionTextContainer>
        <Text className="ddTitle">효능효과</Text>
        <Text className="ddSub">
          {medicine.ee ? medicine.ee : "기재된 효능효과가 없습니다"}
        </Text>
      </DescriptionTextContainer>
      <DescriptionTextContainer>
        <Text className="ddTitle">용법용량</Text>
        <Text className="ddSub">
          {medicine.ee ? medicine.ud : "기재된 용법용량이 없습니다"}
        </Text>
      </DescriptionTextContainer>
      <DescriptionTextContainer>
        <Text className="ddTitle">사용 상의 주의사항</Text>
        <Text className="ddSub">
          {medicine.ee ? medicine.nb : "기재된 주의사항이 없습니다"}
        </Text>
      </DescriptionTextContainer>
    </Container>
  );
}

export default MedicinePage;

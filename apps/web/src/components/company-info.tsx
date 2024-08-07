import styled from "styled-components";
import { constants } from "../data/constans";

export function CompanyInfo() {
  return (
    <>
      <CompanyInfoSection>
        <h4>{constants.companyName}</h4>

        <CompanyContent>
          {/*    <InfoItem>
            <InfoItemName>Компания</InfoItemName>
            <InfoItemValue></InfoItemValue>
          </InfoItem> */}
          <InfoItem>
            <InfoItemName>ИНН</InfoItemName>
            <InfoItemValue>{constants.inn}</InfoItemValue>
          </InfoItem>
          <InfoItem>
            <InfoItemName>ОГРН</InfoItemName>
            <InfoItemValue>{constants.ogrn}</InfoItemValue>
          </InfoItem>
          <InfoItem>
            <InfoItemName>Телефон</InfoItemName>
            <InfoItemValue>{constants.phone}</InfoItemValue>
          </InfoItem>
        </CompanyContent>
      </CompanyInfoSection>
    </>
  );
}

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InfoItemName = styled.div`
  color: red;
  font-weight: 500;
  font-size: 18px;
`;
const InfoItemValue = styled.div`
  font-size: 24px;
`;

const CompanyInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;
  //max-width: 1200px;
  padding: 10px;
  margin: 0 auto;
  padding-bottom: 100px;
  background-color: #000a;

  h4 {
    font-size: clamp(20px, 5vw, 48px);
    font-weight: 800;
  }
`;

const CompanyContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 60px;

  & > * {
    width: calc(50% - 30px);
    &:nth-child(2n + 1):nth-last-child(1) {
      width: 100%;
    }
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

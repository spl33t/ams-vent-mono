import { CompanyInfo } from "@/components/company-info";
import styled from "styled-components";

export function Footer() {
  return (
    <FooterSection>
      <FooterContent>
        <CompanyInfo />
        <CurrentDate>{new Date().toISOString().split("T")[0].replaceAll("-", ".")} - AMSvent.</CurrentDate>
      </FooterContent>
    </FooterSection>
  );
}

const CurrentDate = styled.footer`
  font-size: 3vw;
`;
const FooterSection = styled.footer`
  width: 100%;
  padding: 30px 10px;
  background-color: #000;
  color: #fff;
  font-size: 20px;
  z-index: 100;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 100px;
`;

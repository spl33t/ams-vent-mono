import styled from "styled-components";

export function Footer() {
  return (
    <FooterSection>
      <FooterContent>
        {new Date().toISOString().split("T")[0].replaceAll("-", ".")} - AMSvent.
      </FooterContent>
    </FooterSection>
  );
}

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 100px;
`;

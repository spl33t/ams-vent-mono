import styled from "styled-components";
/* import { $$session } from "../../entity/session";
import { Input, inputFactory } from "../../libs/input-factory";

const $$loginInput = inputFactory("ROOT1337");
const $$passwordInput = inputFactory("ROOT1337");
 */
export function Constants() {
  return (
    <Wrapper>
      Константа
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

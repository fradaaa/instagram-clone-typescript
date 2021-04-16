import styled from "@emotion/styled";
import { FlexCol } from "../Globals";

export const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.background};
  min-height: calc(100vh - 50px * 2);
`;

export const MainContainer = styled(FlexCol)`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px 0;
  min-height: inherit;
`;

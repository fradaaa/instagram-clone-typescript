import styled from "@emotion/styled";
import { FlexCol, FlexRow } from "../Globals";

export const ErrorContainer = styled(FlexCol)`
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100%;
  flex: 1;
`;

export const ErrorText = styled(FlexRow)`
  padding: 20px;
  font-size: 14px;
  margin-bottom: 10px;
  border-radius: var(--brmd);
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.onError};
`;

import styled from "@emotion/styled";
import { FlexCol, FlexRow, StyledInput, StyledLink } from "../Globals";

export const FormContainer = styled.div`
  width: 350px;
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  border-radius: var(--brsm);
  text-align: center;
  padding: 10px 40px;
  background-color: ${({ theme }) => theme.surface2};
  color: ${({ theme }) => theme.onSurface};

  & form {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

export const EditFormContainer = styled(FlexCol)`
  width: 100%;
  height: 100%;
`;

export const FormInfoContainer = styled(FormContainer)`
  font-size: 13px;
  margin: 15px 0 0 0;
`;

export const FormHeader = styled.h1`
  font-size: 21px;
  white-space: nowrap;
`;

export const FormImageHeaderContainer = styled(FlexRow)`
  justify-content: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  background-color: ${({ theme }) => theme.surface2};
  padding: 10px 5px;
  border-radius: var(--brsm);
  margin-bottom: 10px;
`;

export const FormImageHeaderUserName = styled(FlexRow)`
  justify-content: center;
  font-size: 18px;
  margin-left: 15px;
  white-space: nowrap;
  color: ${({ theme }) => theme.onSurface};
`;

export const FormSubheader = styled.h2`
  font-size: 15px;
  color: ${({ theme }) => theme.primary};
`;

export const FormError = styled.div`
  margin-top: 10px;
  border-radius: var(--brsm);
  padding: 10px;
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.onError};
`;

export const FormRow = styled(FlexCol)`
  width: 100%;
  position: relative;
  margin: 0 0 10px 0;
`;

export const RowLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme }) => theme.onSurface};
`;

export const Input = styled(StyledInput)`
  width: 100%;
  height: 35px;
  padding: 5px 35px 5px 5px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.surface3};
`;

export const ErrorInfo = styled.div`
  position: absolute;
  right: 5px;
  top: 27.5px;

  & svg {
    color: ${({ theme }) => theme.error};
    display: block;
    width: 25px;
    height: 25px;
  }
`;

export const StyledTooltip = styled(FlexRow)`
  justify-content: center;
  position: relative;
`;

export const TooltipText = styled.div`
  position: absolute;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.onError};
  padding: 5px;
  font-size: 12px;
  border-radius: var(--brsm);
  left: 100%;
  margin-left: 7px;
`;

export const SuccessText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
`;

export const StyledFormError = styled.div`
  font-size: 14px;
  margin-top: 10px;
  border-radius: var(--brsm);
  padding: 10px;
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.onError};
`;

export const StyledFormLink = styled(StyledLink)`
  padding: 5px;
  font-size: 13px;
`;

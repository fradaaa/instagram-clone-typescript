import styled from "@emotion/styled";
import { IconButton } from "../Components/Buttons/style";

export const ChangeThemeIcon = styled(IconButton)`
  padding: 0 10px;
  height: 100%;
  transition: background-color 0.1s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.surface2};
  }
`;

import styled from "@emotion/styled";
import { Button, IconButton } from "../Buttons/style";
import { FlexCol, FlexRow } from "../Globals";

export const PhotoPreviewContainer = styled(FlexRow)<{ active: boolean }>`
  align-items: normal;
  justify-content: center;
  position: relative;
  flex: 6;
  height: 100%;
  color: ${({ theme }) => theme.onSurface};
  background-color: ${({ theme }) => theme.surface2};
  border: ${({ active, theme }) =>
    active ? `1px solid ${theme.lightBorder}` : `2px dashed ${theme.primary}`};
  border-radius: var(--brmd);
  overflow: hidden;
`;

export const PreviewImageContainer = styled(FlexRow)`
  position: relative;
  height: 100%;
  align-items: normal;

  & img {
    pointer-events: none;
    object-fit: cover;
  }
`;

export const CancelIconButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
`;

export const ChoosePreviewContainer = styled(FlexCol)`
  height: 100%;
  justify-content: center;
  align-items: center;

  & svg {
    display: block;
    width: 100px;
    height: 100px;
  }
`;

export const PreviewText = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const RemovePhoto = styled.span`
  display: flex;
  position: absolute;
  right: 15px;
  top: 15px;
  padding: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.onSurface};
  transition: color 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  & svg {
    display: block;
    width: 15px;
    height: 15px;
  }
`;

export const UploadControlsContainer = styled(FlexRow)`
  justify-content: center;
  flex: 2;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  display: block;
  border-radius: var(--brlg);
  font-size: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 10px;
`;

export const ProgressContainer = styled(FlexRow)`
  height: 15px;
  margin-top: 10px;
  border-radius: var(--brsm);
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  margin-bottom: 5px;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.surface4};
`;

type ProgressProps = {
  percentage: number;
};

export const ProgressBar = styled.div<ProgressProps>`
  position: absolute;
  top: 0;
  width: ${({ percentage }) => percentage + "%"};
  height: 100%;
  background-color: ${({ theme }) => theme.primary};
  transition: width 0.3s ease 0s;
`;

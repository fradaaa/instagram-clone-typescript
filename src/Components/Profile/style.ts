import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FlexCol, FlexRow, StyledLink } from "../Globals";

export const ProfileHeaderContainer = styled(FlexRow)`
  align-items: stretch;
  height: 250px;
  padding: 30px 0;
  border-radius: var(--brmd);
  background-color: ${({ theme }) => theme.surface};
`;

export const ProfilePhotoContainer = styled(FlexRow)`
  flex: 1;
  justify-content: center;
`;

export const HeaderSection = styled(FlexCol)`
  flex: 2;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: stretch;
`;

export const UserNameContainer = styled(FlexRow)``;

export const UserName = styled.h2`
  font-weight: 600;
  font-size: 25px;
  white-space: nowrap;
  margin: 0 10px 0 0;
  color: ${({ theme }) => theme.onSurface};
`;

export const ButtonsContainer = styled(FlexRow)`
  & button:first-of-type {
    margin-right: 10px;
  }
`;

export const ProfileStatsContainer = styled(FlexRow)``;

type ItemContainerProps = {
  pointer?: boolean;
};

export const ItemContainer = styled(FlexRow)<ItemContainerProps>`
  white-space: nowrap;
  font-size: 15px;
  margin: 0 40px 0 0;
  padding: 5px;
  border-radius: var(--brsm);
  color: ${({ theme }) => theme.onSurface};
  cursor: ${({ pointer }) => pointer && "pointer"};
  transition: color 0.1s ease-in, background-color 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.surface2};
  }

  &:last-of-type {
    margin-right: 0px;
  }
`;

export const Number = styled.span`
  font-weight: 600;
  margin-right: 5px;
`;

export const ProfileInfoContainer = styled(FlexCol)`
  color: ${({ theme }) => theme.onSurface};
`;

export const FullName = styled.h3`
  font-size: 15px;
  margin: 0;
`;

export const UserInfo = styled.span`
  display: block;
  font-size: 13px;
`;

export const ProfileNavContainer = styled(FlexRow)`
  justify-content: center;
  background-color: ${({ theme }) => theme.surface};
  margin: 10px 0 0 0;
  border-radius: var(--brmd) var(--brmd) 0 0;
`;

export const ProfileNavLink = styled(StyledLink)`
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  padding: 10px;
  transition: background-color 0.1s ease-in, color 0.1s ease-in;

  :hover {
    background-color: ${({ theme }) => theme.surface2};
  }

  & svg {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
`;

export const ProfilePostsContainer = styled.div`
  display: grid;
  background-color: ${({ theme }) => theme.surface};
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  gap: 10px;
`;

export const PostLink = styled(Link)`
  display: flex;
  align-items: stretch;
`;

export const PostPreviewContainer = styled(FlexRow)`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  display: flex;
  align-items: stretch;

  & img {
    object-fit: cover;
  }
`;

export const PreviewPhotoContainer = styled(FlexRow)`
  height: 100%;
  width: 100%;
  position: absolute;
  align-items: stretch;
  cursor: pointer;
`;

export const PreviewinfoContainer = styled(FlexRow)`
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  color: #fff;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);
  pointer-events: none;

  & svg {
    display: block;
    width: 25px;
    height: 25px;
  }
`;

export const InfoNumber = styled.span`
  margin-left: 10px;
`;

export const MutltiplePhotosContainer = styled(FlexRow)`
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${({ theme }) => theme.onSurface};

  & svg {
    display: block;
    width: 25px;
    height: 25px;
  }
`;

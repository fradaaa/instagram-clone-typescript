import styled from "@emotion/styled";

interface ImageStyleProps {
  width: string;
  height: string;
  src: string | undefined;
  cursor?: boolean;
}

const StyledImage = styled("img")<ImageStyleProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: 50%;
  object-fit: cover;
  user-select: none;
  cursor: ${({ cursor }) => cursor && "pointer"};
  alt: "test";
`;

interface ImageProps extends ImageStyleProps {
  userName: string;
}

const RoundProfileImage = ({
  userName,
  alt,
  ...props
}: ImageProps & React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <StyledImage alt={alt || `${userName}'s profile picture`} {...props} />
  );
};

export default RoundProfileImage;

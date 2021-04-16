import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.1s ease-in;

  :link {
    color: ${({ theme }) => theme.onSurface};
  }

  :visited {
    color: ${({ theme }) => theme.onSurface};
  }

  :focus {
  }

  :hover {
    color: ${({ theme }) => theme.primary};
  }

  :active {
  }
`;

export default StyledLink;

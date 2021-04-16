import { AiOutlineSearch } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import {
  FilterContainer,
  FilterInput,
  FilterSearchIcon,
  StyledIconButton,
} from "./style";

type FilterProps = {
  value: string;
  onСhange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const FilterDialogs = ({ value, onСhange, clearInput }: FilterProps) => {
  return (
    <FilterContainer>
      <FilterSearchIcon htmlFor="filter">
        <AiOutlineSearch />
      </FilterSearchIcon>
      <FilterInput
        type="text"
        id="filter"
        name="filter"
        placeholder="Filter"
        value={value}
        onChange={onСhange}
      />
      <StyledIconButton
        width="25"
        height="25"
        aria-label="Clear filter dialogs input"
        onClick={clearInput}
      >
        <MdClear />
      </StyledIconButton>
    </FilterContainer>
  );
};

export default FilterDialogs;

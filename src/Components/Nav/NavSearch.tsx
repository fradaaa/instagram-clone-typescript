import { Document, useCollection } from "@nandorojo/swr-firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { IProfile } from "../../Firebase/types";
import { RoundProfileImage } from "../Globals";
import {
  EmptySearch,
  NavSearchContainer,
  SearchClearButton,
  SearchIcon,
  SearchInput,
  SearchItem,
  SearchItemPhoto,
  SearchItemUserName,
  SearchResultsContainer,
} from "./style";

const NavSearch = () => {
  const [searchString, setSearchString] = useState("");
  const node = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const history = useHistory();
  const { data } = useCollection<IProfile>(searchString ? "/users" : null, {
    limit: 5,
    where: ["userName", ">=", searchString],
  });

  const handleOutsideClick = (e: MouseEvent) => {
    if (node.current?.contains(e.target as Node)) return;

    setIsFocused(false);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  }, []);

  const handleClick = useCallback(
    (userName: string) => {
      history.push(`/${userName}`);
      setSearchString("");
    },
    [history]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <NavSearchContainer ref={node}>
      <SearchIcon htmlFor="searchInput">
        <AiOutlineSearch />
      </SearchIcon>
      <SearchInput
        type="search"
        name="searchInput"
        id="searchInput"
        placeholder="Search"
        value={searchString}
        onFocus={() => {
          setIsFocused(true);
        }}
        onChange={handleChange}
      ></SearchInput>
      {searchString && (
        <SearchClearButton
          width="20"
          height="20"
          aria-label="Clear filter dialogs input"
          onClick={() => setSearchString("")}
        >
          <MdClear />
        </SearchClearButton>
      )}
      {data && searchString && isFocused ? (
        <SearchResultsContainer>
          {data.length > 0 ? (
            data.map((r) => (
              <SearchResult key={r.id} {...r} handleClick={handleClick} />
            ))
          ) : (
            <EmptySearch>Nothing has been found</EmptySearch>
          )}
        </SearchResultsContainer>
      ) : null}
    </NavSearchContainer>
  );
};

interface SearchResultProps extends Document<IProfile> {
  handleClick: (userName: string) => void;
}

const SearchResult = React.memo(
  ({ photoURL, userName, handleClick }: SearchResultProps) => {
    return (
      <SearchItem onClick={() => handleClick(userName)}>
        <SearchItemPhoto>
          <RoundProfileImage
            width="30"
            height="30"
            src={photoURL}
            userName={userName}
          />
        </SearchItemPhoto>
        <SearchItemUserName>{userName}</SearchItemUserName>
      </SearchItem>
    );
  }
);

export default NavSearch;

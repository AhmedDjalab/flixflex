import React from "react";

export interface ISearchInputProps {
  searchRef: React.RefObject<HTMLInputElement>;
  handleSearch: Function;
}

function Search({ searchRef, handleSearch }: ISearchInputProps) {
  return (
    <div className="flex items-center justify-end flex-1">
      <input
        ref={searchRef}
        type="text"
        className="h-10 mx-8 text-white textfield"
        //value={search}
        onChange={(e) => handleSearch(e)}
        placeholder="title"
      />
    </div>
  );
}

export default Search;

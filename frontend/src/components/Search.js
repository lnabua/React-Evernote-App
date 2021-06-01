import React from 'react';

const Search = (props) => {
  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        value={props.searchTerm}
        onChange={(e) => props.handleSearchTermChange(e.target.value)}
      />
    </div>
  );
}

export default Search;

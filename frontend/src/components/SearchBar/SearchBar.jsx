import { useState } from "react";
import "./SearchBar.scss";

function SearchBar() {
  // state data
  const [value, setValue] = useState();
  // instructions
  function HandleChange(event) {
    setValue(event.target.value);
  }
  function HandleClear() {
    setValue("");
  }
  function HandleSearch() {
    // console.log(value);
    return value;
  }

  // render
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={HandleChange}
        placeholder="Rechercher"
      />
      <button type="button" className="search clear" onClick={HandleClear}>
        <i className="fi fi-rr-cross" />
      </button>
      <button type="button" className="search search" onClick={HandleSearch}>
        <i className="fi fi-rr-search" />
      </button>
    </div>
  );
}
export default SearchBar;

import { useState } from "react";
import "./SearchBar.scss";

function SearchBar() {
  // state data
  const [value, setValue] = useState("searching");
  // instructions
  function HandleChange(event) {
    setValue(event.target.value);
  }
  function HandleClear() {
    setValue("");
  }

  // render
  return (
    <div className="search-bar">
      <div>
        <input
          className="search-input"
          type="text"
          value={value}
          onChange={HandleChange}
          placeholder="Rechercher"
        />
        <button type="button" className="search-clear" onClick={HandleClear}>
          <i className="fi fi-rr-cross" />
        </button>
        <button type="button">
          <i className="fi fi-rr-search" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

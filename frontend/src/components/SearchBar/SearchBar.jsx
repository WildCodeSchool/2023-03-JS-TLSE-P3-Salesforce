import { useState } from "react";
import "./SearchBar.scss";

function SearchBar() {
  // state data
  const [value, setValue] = useState("searching");
  function HandleChange(event) {
    setValue(event.target.value);
  }
  // instructions

  // render
  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          type="text"
          className="fi fi-rs-search"
          value={value}
          onChange={HandleChange}
        />
        <button type="button">SSS</button>
      </div>
    </div>
  );
}

export default SearchBar;

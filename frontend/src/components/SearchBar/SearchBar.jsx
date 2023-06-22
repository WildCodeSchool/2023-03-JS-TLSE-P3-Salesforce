import { useState } from "react";
import "./SearchBar.scss";
import { availableNames } from "../../../utils";

function SearchBar() {
  const [value, setValue] = useState("");
  const [dataArray, setDataArray] = useState([]);
  function handleClear() {
    setValue("");
    if (dataArray.length) {
      setDataArray([]);
    } else {
      setDataArray(availableNames);
    }
  }
  function handleChange(event) {
    setValue(event.target.value);
  }
  function handleSearch() {
    const sortedList = [...availableNames].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const results = sortedList.filter((name) =>
      name.name.toLowerCase().includes(value.toLowerCase())
    );
    setDataArray(results);
  }
  // render
  return (
    <div className="search-component">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={value}
          onClick={handleClear}
          onChange={handleChange}
          placeholder="Rechercher"
        />
        <button type="button" className="search clear" onClick={handleClear}>
          <i className="fi fi-rr-cross" />
        </button>
        <button type="button" className="search search" onClick={handleSearch}>
          <i className="fi fi-rr-search" />
        </button>
      </div>
      <ul className="search-result">
        {dataArray.map((el) => {
          return (
            <li className="line-result" key={el.id}>
              {el.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default SearchBar;

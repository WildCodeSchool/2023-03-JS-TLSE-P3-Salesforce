import { useState } from "react";
import "./SearchBar.scss";
const availableNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
  "Isabella",
  "Jack",
  "Katherine",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Patrick",
  "Quinn",
  "Ryan",
  "Sophia",
  "Thomas",
];
function SearchBar() {
  // state data
  const [value, setValue] = useState();
  const [dataArray, setDataArray] = useState([]);

  // instructions
  function HandleClear(event) {
    setValue([]);
    setDataArray([]);
  }
  function HandleChange(event) {
    setValue(event.target.value);
  }
  function HandleSearch() {
    const sortedList = availableNames.sort((a, b) => a.localeCompare(b));
    const results = sortedList.filter((name) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setDataArray(results);
    console.log(results);
  }

  // render
  return (
    <div className="search-component">
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
      <ul className="search-result">
        {dataArray.map((el) => {
          return (
            <li className="line-result" key="el">
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default SearchBar;

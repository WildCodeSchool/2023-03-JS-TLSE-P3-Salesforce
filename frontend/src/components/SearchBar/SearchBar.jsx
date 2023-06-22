import { useState } from "react";
import "./SearchBar.scss";

const availableNames = [
  { id: 1, name: "Sophia" },
  { id: 2, name: "Charlie" },
  { id: 3, name: "David" },
  { id: 4, name: "Frank" },
  { id: 5, name: "Grace" },
  { id: 6, name: "Alice" },
  { id: 7, name: "Eve" },
  { id: 8, name: "Henry" },
  { id: 9, name: "Isabella" },
  { id: 10, name: "Jack" },
  { id: 11, name: "Bob" },
  { id: 12, name: "Olivia" },
  { id: 13, name: "Katherine" },
  { id: 14, name: "Ryan" },
  { id: 15, name: "Liam" },
  { id: 16, name: "Mia" },
  { id: 17, name: "Noah" },
  { id: 18, name: "Thomas" },
  { id: 19, name: "Patrick" },
  { id: 20, name: "Quinn" },
];
function SearchBar() {
  // state data
  const [value, setValue] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  // instructions
  function HandleChange(event) {
    setValue(event.target.value);
  }
  function HandleClear() {
    setValue([]);
    if (dataArray.length) {
      setDataArray([]);
    } else {
      setDataArray(availableNames);
    }
  }
  function HandleSearch() {
    const sortedList = [...dataArray].sort((a, b) =>
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
          onClick={HandleClear}
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

import { useState } from "react";
import "./SortButton.scss";
import { availableNames } from "../../../utils";

function SortButton() {
  // state
  const [results, setResults] = useState(availableNames);
  // code
  function handleSort(event) {
    event.preventDefault();
    const sortedList = [...results].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setResults(sortedList);
  }
  // render
  return (
    <>
      <button
        type="button"
        className="sort"
        onClick={(event) => handleSort(event)}
      >
        <i className="fi fi-rr-angle-down" />
        Trier
      </button>
      <ul className="sort-result">
        {results.map((el) => {
          return (
            <li className="line-sort" key={el.id}>
              {el.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default SortButton;

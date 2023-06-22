// import { useState } from "react";
import { useState } from "react";
import "./SortButton.scss";

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
function SortButton() {
  // state
  const [results, setResults] = useState(availableNames);
  // code
  function HandleSort(event) {
    event.preventDefault();
    const sortedList = [...results].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setResults(sortedList);
    console.log(sortedList);
  }
  // render
  return (
    <>
      <button
        type="button"
        className="sort"
        onClick={(event) => HandleSort(event)}
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

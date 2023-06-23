import { useState } from "react";
import "./SearchBar.scss";
import { availableNames } from "../../../utils";

function SearchBar() {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  return (
    <div className="search-component">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher"
          onChange={handleSearchTerm}
        />
        <button
          type="button"
          className="search-search"
          // A venir: un toggle pour activer/désactiver la searchbar et lui fixer le focus à l'activation.
          onClick={() => setDatas(availableNames)}
        >
          <i className="fi fi-rr-search" />
        </button>
      </div>
      <div className="search-result">
        {datas
          .filter((val) => {
            return val.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((val) => {
            return (
              <ul className="search-result" key={val.id}>
                <li className="line-result">{val.name}</li>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default SearchBar;

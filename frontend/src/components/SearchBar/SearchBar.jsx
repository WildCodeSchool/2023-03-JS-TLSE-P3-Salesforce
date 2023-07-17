import { useState } from "react";
import "./SearchBar.scss";
import PropTypes from "prop-types";
import { availableNames } from "../../../utils";

export default function SearchBar({ pagePart }) {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  let placeholder = "";

  if (pagePart === "ideas") {
    placeholder = "Rechercher une idée";
  } else if (pagePart === "teams") {
    placeholder = "Rechercher une équipe";
  }

  return (
    <div className="search-component">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder={placeholder}
          onChange={handleSearchTerm}
        />
        <button
          type="button"
          className="search-search"
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

SearchBar.propTypes = {
  pagePart: PropTypes.string,
};

SearchBar.defaultProps = {
  pagePart: "ideas",
};

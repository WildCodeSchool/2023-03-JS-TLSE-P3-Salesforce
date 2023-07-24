import React, { useState } from "react";
import "./SearchBar.scss";
import propTypes from "prop-types";

export default function SearchBar({ pagePart }) {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  let placeholder = "";

  if (pagePart === "ideas") {
    placeholder = "Rechercher une idée";
  } else if (pagePart === "teams") {
    placeholder = "Rechercher une équipe";
  }

  return (
    <div className="input-search-bar">
      <div className="input">
        <i className="fi fi-rr-search" />
        <input
          type="text"
          className="input-search-bar"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <button
          type="button"
          className="search-search"
          onClick={() => setDatas()}
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
  pagePart: propTypes.string,
};

SearchBar.defaultProps = {
  pagePart: "ideas",
};

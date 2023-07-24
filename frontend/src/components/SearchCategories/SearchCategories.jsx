import { useState } from "react";
import PropTypes from "prop-types";
import "./SearchCategories.scss";

function SearchBar({ categories, setSelectedCategories, selectedCategories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClass, setSearchClass] = useState("list-none");

  const handleSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setSearchClass("list");
  };
  const Handleselect = (data) => {
    const selectedCategory = {
      name: data.name,
      id: data.id,
      color: data.color_id,
    };
    setSelectedCategories([...selectedCategories, selectedCategory]);
    setSearchClass("list-none");
  };
  const handleClear = () => {
    setSearchTerm("");
    setSearchClass("list");
  };

  return (
    <div className="search-categories">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            name="searchbar"
            id="searchbar"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={handleSearchTerm}
          />
          <button type="button" className="search-button" onClick={handleClear}>
            <i className="fi fi-rr-search" />
          </button>
        </div>
      </div>
      <div className={searchClass}>
        <ul>
          {categories
            ? categories
                .filter((data) => {
                  return data.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                })
                .map((data) => {
                  return (
                    <li
                      className="search-result"
                      type="button"
                      aria-hidden="true"
                      key={data.id}
                      onClick={() => Handleselect(data)}
                    >
                      <button
                        type="button"
                        aria-hidden="true"
                        className="result-line"
                      />
                      {data.name}
                    </li>
                  );
                })
            : null}
        </ul>
      </div>
    </div>
  );
}
SearchBar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.number,
    })
  ).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  selectedCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.number,
    })
  ).isRequired,
};

export default SearchBar;

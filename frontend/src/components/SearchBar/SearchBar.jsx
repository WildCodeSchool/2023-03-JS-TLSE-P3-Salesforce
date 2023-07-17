import { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.scss";

function SearchBar({ categories, setSelectedCategories, selectedCategories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClass, setSearchClass] = useState("list-none");

  const handleSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setSearchClass("list");
  };
  const Handleselect = (data) => {
    // copy selected item in the input field.
    // on the project, return data.name to the parent.
    const selectedCategory = {
      name: data.name,
      id: data.id,
    };
    setSelectedCategories([...selectedCategories, selectedCategory]);
    setSearchClass("list-none");
  };
  const handleClear = () => {
    setSearchTerm("");
    setSearchClass("list");
  };

  return (
    <div className="search">
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
                      <button type="button" aria-hidden="true" />
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
      id: PropTypes.number,
      name: PropTypes.string,
      color: PropTypes.string,
    })
  ),
  setSelectedCategories: PropTypes.func,
  selectedCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      color: PropTypes.string,
    })
  ),
};
SearchBar.defaultProps = {
  categories: [],
  setSelectedCategories: () => {},
  selectedCategories: [],
};

export default SearchBar;

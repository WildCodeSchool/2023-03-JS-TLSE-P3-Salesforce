import { useState } from "react";
import PropTypes from "prop-types";
import "./SearchCategories.scss";
import Badge from "../Badge/Badge";

export default function SearchCategories({
  categories,
  setSelectedCategories,
  selectedCategories,
  colorBadge,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [areCategoriesVisible, setAreCategoriesVisible] = useState(false);

  const handleSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setAreCategoriesVisible(true);
  };
  const handleSelect = (data) => {
    const selectedCategory = {
      name: data.name,
      id: data.id,
      color: data.color_id,
    };
    setSelectedCategories([...selectedCategories, selectedCategory]);
    setAreCategoriesVisible(false);
    setSearchTerm("");
  };

  const handleBlur = () => {
    setAreCategoriesVisible(false);
  };

  const handleKillCategory = (categoryId) => {
    const newSelectedCategories = [...selectedCategories];
    const index = newSelectedCategories.findIndex(
      (category) => category.id === categoryId
    );
    if (index > -1) {
      newSelectedCategories.splice(index, 1);
    }
    setSelectedCategories(newSelectedCategories);
  };

  return (
    <>
      <div className="input-line">
        <div className="input-field">
          <label htmlFor="searchbar">Catégories</label>
          <div className="input">
            <i className="fi fi-rr-search" />
            <input
              type="text"
              name="searchbar"
              id="searchbar"
              placeholder="Rechercher une catégorie"
              value={searchTerm}
              onChange={handleSearchTerm}
              onBlur={() => setTimeout(() => handleBlur(), 1000)}
            />
          </div>
          {areCategoriesVisible &&
            categories.some((data) => {
              return data.name.toLowerCase().includes(searchTerm.toLowerCase());
            }) && (
              <ul className="search-categories-results">
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
                            className="search-categories-result"
                            key={data.id}
                          >
                            <button
                              type="button"
                              aria-hidden="true"
                              className="result-line"
                              onClick={() => handleSelect(data)}
                            >
                              {data.name}
                            </button>
                          </li>
                        );
                      })
                  : null}
              </ul>
            )}
        </div>
      </div>
      <div className="search-badges">
        {selectedCategories
          .filter(
            (category, index, self) =>
              index === self.findIndex((c) => c.id === category.id)
          )
          .map((data) => (
            <Badge color={colorBadge[data.color].name} key={data.id}>
              {data.name}
              <i
                type="button"
                aria-hidden="true"
                className="fi fi-rr-cross-small"
                onClick={() => handleKillCategory(data.id)}
              />
            </Badge>
          ))}
      </div>
    </>
  );
}
SearchCategories.propTypes = {
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
  colorBadge: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

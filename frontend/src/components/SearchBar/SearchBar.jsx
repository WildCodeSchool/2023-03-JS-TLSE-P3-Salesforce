import { useState } from "react";
import "./SearchBar.scss";
import { availableNames } from "../../../utils";

function SearchBar() {
  const [datas] = useState(availableNames);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);
  const [searchClass, setSearchClass] = useState("list-none");

  const handleVisible = () => {
    setSearchTerm("");
    // items-list visible/not visible; kill this line on final project.
    // kill this line for dynamic search.
    if (visible) {
      setSearchClass("list-none");
    } else setSearchClass("list");
    setVisible(!visible);
  };
  const handleSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  const Handleselect = (data) => {
    // copy selected item in the input field.
    // on the project, return data.name to the parent.
    setSearchTerm(data.name);
    setSearchClass("list-none");
    setVisible(false);
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
          <button
            type="button"
            className="search-button"
            onClick={handleVisible}
          >
            <i className="fi fi-rr-search" />
          </button>
        </div>
      </div>
      <div className={searchClass}>
        <ul>
          {datas
            .filter((data) => {
              return data.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((data) => {
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  className="search-result"
                  key={data.id}
                  onClick={() => Handleselect(data)}
                  onKeyDown={() => {}}
                >
                  {data.name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
export default SearchBar;

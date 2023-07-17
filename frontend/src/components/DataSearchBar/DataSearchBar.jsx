import "./DataSearchBar.scss";
import propTypes from "prop-types";

export default function DataSearchBar({ setSearchTerm, searchTerm }) {
  return (
    <div className="input-search-bar">
      <div className="input">
        <i className="fi fi-rr-search" />
        <input
          type="text"
          className="input-search-bar"
          placeholder="Rechercher un membre"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
    </div>
  );
}

DataSearchBar.propTypes = {
  setSearchTerm: propTypes.func,
  searchTerm: propTypes.string,
};

DataSearchBar.defaultProps = {
  searchTerm: "",
  setSearchTerm: () => {},
};

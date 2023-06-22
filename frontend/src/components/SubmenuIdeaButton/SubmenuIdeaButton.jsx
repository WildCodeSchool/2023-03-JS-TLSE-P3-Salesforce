import React from "react";
import PropTypes from "prop-types";
import "./SubmenuIdeaButton.scss";

export default function SubmenuIdeaButton({ showSubmenu, setShowSubmenu }) {
  // on fait apparaitre/ cache le sous-menu de l'idée quand on clic dessus
  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <>
      {/* ajout du sous menu en entete */}
      <button type="button" className="idea-menu-icon" onClick={toggleSubmenu}>
        <i className="fi fi-rr-menu-dots-vertical" />
      </button>
      {showSubmenu && (
        <ul className="submenu-idea">
          <li onClick={toggleSubmenu} aria-hidden="true">
            <i className="fi fi-rr-attribution-pencil" />
            <a href="/modifier">Modifier</a>
          </li>
          <li onClick={toggleSubmenu} aria-hidden="true">
            <i className="fi fi-rr-trash" />
            <a href="/supprimer">Supprimer</a>
          </li>
          <li onClick={toggleSubmenu} aria-hidden="true">
            <i className="fi fi-rr-copy" />
            <a href="/dupliquer">Dupliquer</a>
          </li>
        </ul>
      )}
    </>
  );
}

SubmenuIdeaButton.propTypes = {
  showSubmenu: PropTypes.bool.isRequired,
  setShowSubmenu: PropTypes.func.isRequired,
};

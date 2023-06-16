import React from "react";
import PropTypes from "prop-types";
import "./SubmenuIdeaButton.scss";

export default function SubmenuIdeaButton({ showSubmenu, setShowSubmenu }) {
  // on fait apparaitre/ cache le sous-menu de l'idée quand on clic dessus
  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <div>
      {/* ajout du sous menu en entete */}
      <button type="button" className="idea-menu-icon" onClick={toggleSubmenu}>
        &#8942;
      </button>

      {/* lorsque le sous menu est actif , on fait apparaitre les éléments du sous menu */}
      {showSubmenu && (
        <div className="submenu-idea">
          <ul>
            <li className="submenu-modify-idea">Modifier</li>
            <li className="submenu-cancel-idea">Supprimer</li>
            <li className="submenu-duplicate-idea">Dupliquer</li>
          </ul>
        </div>
      )}
    </div>
  );
}
SubmenuIdeaButton.propTypes = {
  showSubmenu: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
  setShowSubmenu: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
};

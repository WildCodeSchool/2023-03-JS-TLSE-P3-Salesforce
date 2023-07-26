import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

import "./SubmenuIdeaButton.scss";

export default function SubmenuIdeaButton({
  setShowSubmenu,
  ideaId,
  setIsIdeaDeleted,
}) {
  // on fait apparaitre/ cache le sous-menu de l'idée quand on clic dessus
  const { userToken } = useContext(AuthContext);

  const handleDeleteIdea = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/ideas/${ideaId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        if (res.affectedRows === 0) {
          console.error("L'idée n'a pas été supprimée");
        } else {
          setIsIdeaDeleted(true);
          setTimeout(() => {
            setIsIdeaDeleted(false);
          }, 3000);
          setShowSubmenu(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {/* ajout du sous menu en entete */}

      <ul className="submenu-idea">
        <div onClick={() => setShowSubmenu(false)} aria-hidden="true">
          <i className="fi fi-rr-cross" />
        </div>
        <li aria-hidden="true">
          <i className="fi fi-rr-attribution-pencil" />
          <a href="/modifier">Modifier</a>
        </li>
        <li aria-hidden="true" onClick={handleDeleteIdea}>
          <i className="fi fi-rr-trash" />
          <p>Supprimer</p>
        </li>
      </ul>
    </>
  );
}

SubmenuIdeaButton.propTypes = {
  setShowSubmenu: PropTypes.func.isRequired,
  ideaId: PropTypes.number.isRequired,
  setIsIdeaDeleted: PropTypes.func.isRequired,
};

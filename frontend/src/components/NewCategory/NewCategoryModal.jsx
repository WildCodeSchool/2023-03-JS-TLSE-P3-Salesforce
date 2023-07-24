import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";

import "./NewCategoryModal.scss";

export default function NewCategoryModal({ setIsNewCategoryModalOpen }) {
  const { companyInfos } = useContext(CompanyContext);
  const { userToken, userInfos } = useContext(AuthContext);
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // const [isPrivate, setIsPrivate] = useState(false);
  const formObject = {
    name: "category_test",
    color_id: 1,
  };
  // récupérer la liste des catégory existantes
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((response) => {
        setCategories(response.data);
        // eslint-disable-next-line no-restricted-syntax
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/categories/${
          companyInfos.id
        }/users/${userInfos.id}/categories`,
        formObject,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setIsNewCategoryModalOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create team:", error.message);
        setHasConnectionFailed(true);
      });
  };

  return (
    <div className="modal new-category-modal">
      <div
        className="filter"
        onClick={() => setIsNewCategoryModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-user-add" />
          </div>
          <div className="content">
            <h3>Nouvelle categories</h3>
            <p className="details">
              Créez une catégorie et attribuez lui une couleur.
            </p>
          </div>
          <button
            className="close"
            onClick={() => setIsNewCategoryModalOpen(false)}
            type="button"
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>

        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="input-line">
              <div className="input-field">
                <p className="input-help">
                  Il sera visible dans la navigation.
                </p>
                <div className="input" />
              </div>
            </div>

            <div className="input-line">
              <div className="input-field">
                <label htmlFor="name">Nom (obligatoire)</label>
                <div className="input">
                  <input
                    type="text"
                    name="name"
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                    placeholder="Donnez un nom à votre categorie"
                    id="name"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            {hasConnectionFailed && (
              <div className="error-message">
                Erreur lors de la création de l'équipe. Veuillez réessayer.
              </div>
            )}

            <div className="actions">
              <button
                className="cancel"
                onClick={() => setIsNewCategoryModalOpen(false)}
                type="button"
              >
                Annuler
              </button>
              <button className="submit" type="submit">
                <i className="fi fi-rr-plus" />
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

NewCategoryModal.propTypes = {
  setIsNewCategoryModalOpen: PropTypes.func.isRequired,
};

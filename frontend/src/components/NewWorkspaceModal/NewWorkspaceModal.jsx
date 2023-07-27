import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";
import "./NewWorkspaceModal.scss";

export default function NewWorkspaceModal({ setIsNewWorkspaceModalOpen }) {
  const { companyInfos } = useContext(CompanyContext);
  const { userToken, userInfos } = useContext(AuthContext);
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // Vérifier les champs obligatoires
    if (!workspaceName || !userInfos.id) {
      console.error("Missing required values");
      return;
    }
    // Créer l'objet FormData et y ajouter les données du formulaire

    const formData = new FormData(form);

    const dataFromForm = Object.fromEntries(formData.entries());
    dataFromForm.isPrivate = isPrivate ? 1 : 0;

    // Envoyer la requête POST pour créer l'équipe
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/users/${userInfos.id}/workspaces`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setIsNewWorkspaceModalOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create team:", error.message);
        setHasConnectionFailed(true);
      });
  };

  return (
    <div className="modal new-workspace-modal">
      <div
        className="filter"
        onClick={() => setIsNewWorkspaceModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-user-add" />
          </div>
          <div className="content">
            <h3>Nouvel Espace de travail</h3>
            <p className="details">
              Rassemblez vos collègues et lancez un nouvel espace de travail.
            </p>
          </div>
          <button
            className="close"
            onClick={() => setIsNewWorkspaceModalOpen(false)}
            type="button"
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>

        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="name">Nom de votre espace personnel</label>
                <div className="input">
                  <input
                    type="text"
                    name="name"
                    value={workspaceName}
                    onChange={(event) => setWorkspaceName(event.target.value)}
                    placeholder="Donnez un nom à votre espace"
                    id="name"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-field">
                <label htmlFor="description">Description</label>
                <div className="input">
                  <input
                    type="text"
                    name="description"
                    value={workspaceDescription}
                    onChange={(event) =>
                      setWorkspaceDescription(event.target.value)
                    }
                    placeholder="Décrivez l'objectif de votre espace, sa raison d'être"
                    id="description"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-switch input-switch--sm">
                <label htmlFor="isPrivate">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    id="isPrivate"
                    checked={isPrivate}
                    onChange={(event) => {
                      setIsPrivate(event.target.checked);
                    }}
                  />
                  <div className="toggle-switch" />
                  {isPrivate ? (
                    <div className="label">
                      <p className="title">Espace privé</p>
                      <p className="help">
                        Si vous cochez cette option, votre espace n’apparaîtra
                        pas dans les résultats de recherche.
                      </p>
                    </div>
                  ) : (
                    <div className="label">
                      <p className="title">Espace public</p>
                      <p className="help">
                        Si vous cochez cette option, votre espace apparaîtra
                        dans les résultats de recherche.
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {hasConnectionFailed && (
              <div className="error-message">
                Erreur lors de la création de l'espace personnel. Veuillez
                réessayer.
              </div>
            )}

            <div className="actions">
              <button
                className="cancel"
                onClick={() => setIsNewWorkspaceModalOpen(false)}
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

NewWorkspaceModal.propTypes = {
  setIsNewWorkspaceModalOpen: PropTypes.func.isRequired,
};

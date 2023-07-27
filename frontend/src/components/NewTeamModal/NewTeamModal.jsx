import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";
import "./NewTeamModal.scss";

export default function NewTeamModal({ setIsNewTeamModalOpen }) {
  const { companyInfos } = useContext(CompanyContext);
  const { userToken, userInfos } = useContext(AuthContext);
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamPictureUrl, setTeamPictureUrl] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    // Vérifier les champs obligatoires
    if (!teamName || !userInfos.id) {
      console.error("Missing required values");
      return;
    }

    // Créer l'objet FormData et y ajouter les données du formulaire
    const formData = new FormData(form);

    const dataFromForm = Object.fromEntries(formData.entries());
    if (dataFromForm.is_private) {
      dataFromForm.is_private = 1;
    } else {
      dataFromForm.is_private = 0;
    }
    dataFromForm.status = "Active";
    dataFromForm.userId = userInfos.id;

    // Envoyer la requête POST pour créer l'équipe
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/users/${userInfos.id}/teams`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setIsNewTeamModalOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create team:", error.message);
        setHasConnectionFailed(true);
      });
  };

  return (
    <div className="modal new-team-modal">
      <div
        className="filter"
        onClick={() => setIsNewTeamModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-user-add" />
          </div>
          <div className="content">
            <h3>Nouvelle équipe</h3>
            <p className="details">
              Rassemblez vos collègues et lancez une nouvelle équipe dynamique.
            </p>
          </div>
          <button
            className="close"
            onClick={() => setIsNewTeamModalOpen(false)}
            type="button"
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>

        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="picture_url">Lien vers votre logo</label>
                <p className="input-help">
                  Il sera visible dans la navigation.
                </p>
                <div className="input">
                  <i className="fi fi-rr-link-alt" />
                  <input
                    type="url"
                    name="picture_url"
                    placeholder="Le lien vers votre photo de profil"
                    id="picture_url"
                    value={teamPictureUrl}
                    onChange={(event) => {
                      setTeamPictureUrl(event.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-field">
                <label htmlFor="name">Nom (obligatoire)</label>
                <div className="input">
                  <input
                    type="text"
                    name="name"
                    value={teamName}
                    onChange={(event) => setTeamName(event.target.value)}
                    placeholder="Donnez un nom à votre équipe"
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
                    value={teamDescription}
                    onChange={(event) => setTeamDescription(event.target.value)}
                    placeholder="Décrivez l'objectif de votre équipe, sa raison d'être"
                    id="description"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-line">
              <div className="input-switch input-switch--sm">
                <label htmlFor="is_private">
                  <input
                    type="checkbox"
                    name="is_private"
                    id="is_private"
                    onChange={(event) => {
                      setIsPrivate(event.target.checked);
                    }}
                  />
                  <div className="toggle-switch" />
                  {isPrivate ? (
                    <div className="label">
                      <p className="title">Équipe privée</p>
                      <p className="help">
                        Si vous cochez cette option, votre équipe n’apparaîtra
                        pas dans les résultats de recherche.
                      </p>
                    </div>
                  ) : (
                    <div className="label">
                      <p className="title">Équipe publique</p>
                      <p className="help">
                        Si vous cochez cette option, votre équipe apparaîtra
                        dans les résultats de recherche.
                      </p>
                    </div>
                  )}
                </label>
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
                onClick={() => setIsNewTeamModalOpen(false)}
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

NewTeamModal.propTypes = {
  setIsNewTeamModalOpen: PropTypes.func.isRequired,
};

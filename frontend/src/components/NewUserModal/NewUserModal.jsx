/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import propTypes from "prop-types";
import AuthContext from "../../contexts/AuthContext";
import "./NewUserModal.scss";

export default function NewUserModal({ setIsNewUserModalOpen }) {
  const AuthValue = useContext(AuthContext);
  const { userToken, userInfos } = AuthValue;
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post(`${import.meta.env.VITE_BACKEND_URL}/phone`, formObject, {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 201) {
  //         setIsNewUserModalOpen(false);
  //         setTogglePhones(!togglePhones);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error.message);
  //     });
  // };

  return (
    <div className="modal new-user-modal">
      <div
        className="filter"
        onClick={() => setIsNewUserModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-user-add" />
          </div>
          <div className="content">
            <h3>Nouveau membre</h3>
            <p className="details">
              Invitez vos collègues à partager leurs idées.
            </p>
          </div>
          <button
            className="close"
            onClick={() => setIsNewUserModalOpen(false)}
            type="button"
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>
        <div className="body">
          <form>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="firstname">Nom</label>
                <div className="input">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Son nom"
                    id="firstname"
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="lastname">Prénom</label>
                <div className="input">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Son prénom"
                    id="lastname"
                  />
                </div>
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="email">Adresse email</label>
                <div className="input-help">
                  Renseignez l'adresse mail avec laquelle le membre se
                  connectera.
                </div>
                <div className="input">
                  <i className="fi fi-rr-envelope" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Son adresse email"
                    id="email"
                  />
                </div>
              </div>
            </div>
            <div className="actions">
              <button type="button" className="submit">
                Envoyer l'invitation <i className="fi fi-rr-paper-plane-top" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

NewUserModal.propTypes = {
  setIsNewUserModalOpen: propTypes.func.isRequired,
};

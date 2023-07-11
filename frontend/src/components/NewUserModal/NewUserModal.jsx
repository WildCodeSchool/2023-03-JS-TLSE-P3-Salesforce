/* eslint-disable no-unused-vars */
import { sanitize } from "isomorphic-dompurify";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import propTypes from "prop-types";
import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";
import "./NewUserModal.scss";

export default function NewUserModal({ setIsNewUserModalOpen }) {
  const { companyInfos } = useContext(CompanyContext);
  const [email, setEmail] = useState("");
  const { userToken } = useContext(AuthContext);

  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const style = getComputedStyle(document.body);
    const primary600 = style.getPropertyValue("--primary-600");
    const grey50 = style.getPropertyValue("--grey-50");

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    dataFromForm.company_name = companyInfos.name;
    dataFromForm.primary600 = primary600;
    dataFromForm.grey50 = grey50;
    dataFromForm.company_slug = companyInfos.slug;

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/users`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        setIsNewUserModalOpen(false);
      })
      .catch((error) => {
        console.error(error.message);
        setHasConnectionFailed(true);
      });
  };

  // handler for change in input mail
  const handleEmailChange = (event) => {
    setEmail(sanitize(event.target.value));
    setHasConnectionFailed(false);
  };

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
          <form onSubmit={handleFormSubmit}>
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
                    onChange={handleEmailChange}
                    value={email}
                  />
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="submit" type="submit">
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

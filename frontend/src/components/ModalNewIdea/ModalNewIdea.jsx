/* eslint-disable no-unused-vars */
import { sanitize } from "isomorphic-dompurify";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import propTypes from "prop-types";
import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";
import "./ModalNewIdea.scss";

export default function ModalNewIdea({ setIsModalNewIdeaOpen }) {
  const { companyInfos } = useContext(CompanyContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");

  const { userToken } = useContext(AuthContext);

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
        setIsModalNewIdeaOpen(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // handler for change in input mail
  const handleTitleChange = (event) => {
    setTitle(sanitize(event.target.value));
  };
  const handleDescriptionChange = (event) => {
    setDescription(sanitize(event.target.value));
  };
  const handleCategoriesChange = (event) => {
    setCategories(sanitize(event.target.value));
  };

  return (
    <div className="modal new-user-modal">
      <div
        className="filter"
        onClick={() => setIsModalNewIdeaOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-bulb" />
          </div>
          <div className="content">
            <h3>Nouvelle idée</h3>
            <p className="details">
              Faites briller votre imagination avec cette nouvelle idée.
            </p>
          </div>
          <button
            className="close"
            onClick={() => setIsModalNewIdeaOpen(false)}
            type="button"
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>
        <div className="body">
          <form onSubmit={handleFormSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="titleidea">Titre de l'idée *</label>
                <div className="input">
                  <input
                    type="text"
                    name="text"
                    placeholder="titre de la nouvelle idée"
                    id="titleidea"
                    onChange={handleTitleChange}
                    value={title}
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="descriptionidea">Description *</label>
                <div className="textarea">
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="description de la nouvelle idée"
                    id="descriptionidea"
                    onChange={handleDescriptionChange}
                    value={description}
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="categorieidea">Catégories</label>
                <div className="input-help">
                  Renseignez une ou plusieurs catégories d'idées
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="text"
                    placeholder="catégories de la nouvelle idée"
                    id="categoriesidea"
                    onChange={handleCategoriesChange}
                    value={categories}
                  />
                </div>
              </div>
            </div>
            <div className="actions">
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

ModalNewIdea.propTypes = {
  setIsModalNewIdeaOpen: propTypes.func.isRequired,
};

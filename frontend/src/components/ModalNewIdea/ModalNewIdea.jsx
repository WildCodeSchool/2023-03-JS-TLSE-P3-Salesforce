/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar/SearchBar";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import Badge from "../Badge/Badge";
import "./ModalNewIdea.scss";

export default function NewIdeaModal({ setIsIdeaModalOpen }) {
  const { userToken, userInfos } = useContext(AuthContext);
  const { companyInfos } = useContext(CompanyContext);
  const [titleIdea, setTitleIdea] = useState([]);
  const [textIdea, setTextIdea] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data);
          setIsIdeaModalOpen(true);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  const handleChangeTitle = (e) => {
    setTitleIdea(e.target.value);
  };
  const handleChangeText = (e) => {
    setTextIdea(e.target.value);
  };
  const handleKillCategory = (categoryId) => {
    const newSelectedCategories = [...selectedCategories];
    const index = newSelectedCategories.findIndex(
      (category) => category.id === categoryId
    );
    if (index > -1) {
      newSelectedCategories.splice(index, 1);
    }
    setSelectedCategories(newSelectedCategories);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formObject = [
      titleIdea,
      textIdea,
      selectedCategories,
      parseInt(companyInfos.id, 10),
      userInfos.id,
    ];
  };

  return (
    <div className="modal new-idea-modal">
      <div
        className="filter"
        onClick={() => setIsIdeaModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="icon">
            <i className="fi fi-rr-bulb" />
          </div>
          <div className="content">
            <h3>Nouvelle idée</h3>
            <p>Faites briller votre imagination avec cette nouvelle idée.</p>
          </div>
          <button
            className="close"
            onClick={() => setIsIdeaModalOpen(false)}
            type="button"
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>
        <div className="body">
          <h3 className="input-label">Titre (obligatoire)</h3>
          <input
            className="input-title"
            type="text"
            onChange={handleChangeTitle}
          />
          <h3 className="input-label">Description</h3>
          <input
            className="input-text"
            type="textarea"
            onChange={handleChangeText}
          />
          <h3 className="input-label">Categorie</h3>

          <SearchBar
            categories={categories}
            setSelectedCategories={setSelectedCategories}
            selectedCategories={selectedCategories}
          />
          <div className="search-badges">
            {selectedCategories
              .filter(
                (category, index, self) =>
                  index === self.findIndex((c) => c.id === category.id)
              )
              .map((data) => (
                <Badge key={data.id} color={data.color}>
                  {data.name}

                  <i
                    type="button"
                    aria-hidden="true"
                    className="fi fi-rr-cross-small"
                    onClick={() => handleKillCategory(data.id)}
                  />
                </Badge>
              ))}
          </div>

          <div className="actions">
            <button
              type="button"
              aria-hidden="true"
              className="cancel"
              onClick={() => setIsIdeaModalOpen(false)}
            >
              Annuler <i className="fi fi-rr-check" />
            </button>
            <button type="button" className="submit" onClick={handleSubmit}>
              Ajouter
              <i className="fi fi-rr-check" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
NewIdeaModal.propTypes = {
  setIsIdeaModalOpen: PropTypes.func.isRequired,
};

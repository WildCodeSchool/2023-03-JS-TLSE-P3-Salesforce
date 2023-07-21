/* eslint-disable no-restricted-syntax */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SearchCategories from "../SearchCategories/SearchCategories";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import Badge from "../Badge/Badge";
import "./NewIdeaModal.scss";

export default function NewIdeaModal({ setIsNewIdeaModalOpen }) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { userToken, userInfos } = useContext(AuthContext);
  const { companyInfos } = useContext(CompanyContext);
  const [titleIdea, setTitleIdea] = useState([]);
  const [textIdea, setTextIdea] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [emptyField, setEmptyField] = useState("input-title");
  // const [insertedIdeaId, setInsertedIdeaId] = useState(null);

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
          setIsNewIdeaModalOpen(true);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleChangeTitle = (e) => {
    setTitleIdea(e.target.value);
    setEmptyField("input-title");
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
    if (textIdea.length) {
      const formObject = {
        title: titleIdea,
        description: textIdea,
        fileId: null,
      };

      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/companies/${
            companyInfos.id
          }/users/${userInfos.id}/ideas`,
          formObject,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            setIsNewIdeaModalOpen(false);
            const insertedIdeaId = response.data.insertId;
            console.log("insert ____ ", insertedIdeaId);
            console.log("categories : ", selectedCategories);
            if (selectedCategories.length) {
              selectedCategories.map(
                (el) =>
                  insertedIdeaId &&
                  axios
                    .post(
                      `${import.meta.env.VITE_BACKEND_URL}/cathasidea`,
                      { category_id: el.id, idea_id: insertedIdeaId },
                      {
                        headers: {
                          Authorization: `Bearer ${userToken}`,
                        },
                      }
                    )
                    .catch((error) => {
                      console.error(error.message);
                    })
              );
            }
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      setEmptyField("input-title-empty");
    }
  };

  const closeModal = () => {
    setIsNewIdeaModalOpen(false);
    setIsModalVisible(false);
  };

  return (
    isModalVisible && (
      <div className="modal new-idea-modal">
        <div className="filter" onClick={closeModal} aria-hidden="true" />
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
              type="button"
              className="close"
              onClick={closeModal}
              aria-hidden="true"
            >
              <i className="fi fi-rr-cross" />
            </button>
          </div>
          <div className="body">
            <h3 className="input-label">Titre (obligatoire)</h3>
            <input
              className={emptyField} // change
              type="text"
              onChange={handleChangeTitle}
            />
            <h3 className="input-label">Description</h3>
            <textarea className="input-text" onChange={handleChangeText} />
            <h3 className="input-label">Categorie</h3>

            <SearchCategories
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
                onClick={closeModal}
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
    )
  );
}

NewIdeaModal.propTypes = {
  setIsNewIdeaModalOpen: PropTypes.func.isRequired,
};

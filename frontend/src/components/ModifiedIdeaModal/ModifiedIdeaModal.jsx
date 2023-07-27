/* eslint-disable camelcase */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import propTypes from "prop-types";
import SearchCategories from "../SearchCategories/SearchCategories";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import "./ModifiedIdeaModal.scss";

export default function ModifiedIdeaModal({
  setIsModifiedIdeaModalOpen,
  currentIdea,
}) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { userToken } = useContext(AuthContext);
  const { companyInfos } = useContext(CompanyContext);
  const [titleIdea, setTitleIdea] = useState(currentIdea.title);
  const [textIdea, setTextIdea] = useState(currentIdea.description);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [emptyField, setEmptyField] = useState(false);
  const [colorBadge, setColorBadge] = useState([]);
  const { workspace_id } = useParams();

  let workspaceId = null;
  if (workspace_id) {
    workspaceId = workspace_id;
  }

  /* ---- recupère les catégories ---- */
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/categories`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  /* recupère les couleurs pour afficher les badges ---- */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/colors`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setColorBadge(response.data);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleChangeTitle = (e) => {
    setTitleIdea(e.target.value);
    setEmptyField(false);
  };

  const handleChangeText = (e) => {
    setTextIdea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textIdea.length) {
      const formObject = {
        title: titleIdea,
        description: textIdea,
        fileId: null,
        workspace_id: workspaceId,
      };
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/companies/ideas/${
            currentIdea.id
          }`,
          formObject,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            if (currentIdea.categories) {
              axios
                .delete(
                  `${import.meta.env.VITE_BACKEND_URL}/cathasidea/${
                    currentIdea.id
                  }`,
                  {
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                    },
                  }
                )
                .then(() => {
                  if (selectedCategories.length) {
                    selectedCategories.map((el) =>
                      axios
                        .post(
                          `${import.meta.env.VITE_BACKEND_URL}/cathasidea`,
                          { category_id: el.id, idea_id: currentIdea.id },
                          {
                            headers: {
                              Authorization: `Bearer ${userToken}`,
                            },
                          }
                        )
                        .then(() => {
                          setIsModifiedIdeaModalOpen(false);
                        })
                        .catch((error) => {
                          console.error(error.message);
                        })
                    );
                  }
                });
            } else if (selectedCategories.length) {
              selectedCategories.map((el) =>
                axios
                  .post(
                    `${import.meta.env.VITE_BACKEND_URL}/cathasidea`,
                    { category_id: el.id, idea_id: currentIdea.id },
                    {
                      headers: {
                        Authorization: `Bearer ${userToken}`,
                      },
                    }
                  )
                  .then(() => {
                    setIsModifiedIdeaModalOpen(false);
                  })
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
      setEmptyField(true);
    }
  };

  const closeModal = () => {
    setIsModifiedIdeaModalOpen(false);
    setIsModalVisible(false);
  };

  return (
    isModalVisible && (
      <div className="modal modified-idea-modal">
        <div className="filter" onClick={closeModal} aria-hidden="true" />
        <div className="container">
          <div className="header">
            <div className="icon">
              <i className="fi fi-rr-bulb" />
            </div>
            <div className="content">
              <h3>Modifier l'idée</h3>
            </div>
            <button type="button" className="close" onClick={closeModal}>
              <i className="fi fi-rr-cross" />
            </button>
          </div>
          <div className="body">
            <div className="input-line">
              <div
                className={`input-field ${emptyField && "empty-input-field"}`}
              >
                <label htmlFor="title">Titre (obligatoire)</label>
                <div className="input">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={titleIdea}
                    placeholder="Donnez un titre à votre idée"
                    onChange={handleChangeTitle}
                    required
                  />
                  {emptyField && <i className="fi fi-rr-exclamation" />}
                </div>
                {emptyField && (
                  <div className="input-help">
                    Vous devez indiquer le titre de votre idée
                  </div>
                )}
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="company-biography">
                  Description (obligatoire)
                </label>
                <div className="textarea">
                  <textarea
                    name="company-biography"
                    placeholder="Décrivez votre idée en quelques mots"
                    id="company-biography"
                    rows="4"
                    onChange={handleChangeText}
                    required
                    value={textIdea}
                  />
                </div>
              </div>
            </div>

            <SearchCategories
              categories={categories}
              setSelectedCategories={setSelectedCategories}
              selectedCategories={selectedCategories}
              colorBadge={colorBadge}
            />

            <div className="actions">
              <button
                type="button"
                aria-hidden="true"
                className="button-md-grey-outline"
                onClick={closeModal}
              >
                Annuler
              </button>
              <button
                type="button"
                className="button-md-primary-solid"
                onClick={handleSubmit}
              >
                <i className="fi fi-rr-check" />
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

ModifiedIdeaModal.propTypes = {
  setIsModifiedIdeaModalOpen: propTypes.func.isRequired,
  currentIdea: propTypes.shape({
    title: propTypes.string.isRequired,
    description: propTypes.string,
    categories: propTypes.string,
    x_coordinate: propTypes.number,
    y_coordinate: propTypes.number,
    id: propTypes.number,
    likes_count: propTypes.number,
    is_liked_by_user: propTypes.number,
  }),
};

ModifiedIdeaModal.defaultProps = {
  currentIdea: {
    title: "",
    description: "",
    categories: "",
    x_coordinate: 0,
    y_coordinate: 0,
    id: 0,
    likes_count: 0,
    is_liked_by_user: 0,
  },
};

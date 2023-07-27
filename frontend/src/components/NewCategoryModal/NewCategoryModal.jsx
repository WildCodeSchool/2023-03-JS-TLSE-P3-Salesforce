/* eslint-disable no-restricted-syntax */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import Badge from "../Badge/Badge";
import ColorPicker from "../ColorPicker/ColorPicker";

import "./NewCategoryModal.scss";

export default function NewCategoryModal({ setIsNewCategoryModalOpen }) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { userToken } = useContext(AuthContext);
  const { companyInfos } = useContext(CompanyContext);
  const [titleCategory, setTitleCategory] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [emptyField, setEmptyField] = useState("input-title");
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/colors`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setColors(response.data);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleChangeTitle = (e) => {
    setTitleCategory(e.target.value);
    setEmptyField("input-title");
  };

  const closeModal = () => {
    setIsNewCategoryModalOpen(false);
    setIsModalVisible(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(titleCategory);
    console.log(selectedColor);
    const selectedColorObject = colors.find(
      (color) => color.name === selectedColor
    );
    console.log(selectedColorObject.id);
    console.log(companyInfos.id);
    if (titleCategory.length) {
      const formObject = {
        name: titleCategory,
        color_id: selectedColorObject.id,
        company_id: companyInfos.id,
      };
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/companies/${
            companyInfos.id
          }/categories`,
          formObject,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            setIsNewCategoryModalOpen(false);
          } else {
            setEmptyField("input-title-empty");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return (
    isModalVisible && (
      <div className="modal new-category-modal">
        <div className="filter" onClick={closeModal} aria-hidden="true" />
        <div className="container">
          <div className="header">
            <div className="icon">
              <i className="fi fi-rr-bulb" />
            </div>
            <div className="content">
              <h3>Nouvelle catégorie</h3>
              <p>Donnez une catégorie à votre idée.</p>
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
            <h3 className="input-label">Couleur</h3>
            <div className="search-categories">
              <form id="color-picker-form">
                <div className="color-picker-container">
                  {colors.map((color) => (
                    <ColorPicker
                      key={color.id}
                      colorName={color.name}
                      colorId={color.id}
                      setSelectedColor={setSelectedColor}
                    />
                  ))}
                </div>
              </form>
            </div>
            <div className="search-badges">
              <Badge color={selectedColor}>{titleCategory}</Badge>
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

NewCategoryModal.propTypes = {
  setIsNewCategoryModalOpen: PropTypes.func.isRequired,
};

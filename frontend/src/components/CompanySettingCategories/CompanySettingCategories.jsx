import { useState, useEffect, useContext } from "react";
import axios from "axios";

// import "./CompanySettingsMembers.scss";

import NewCategoryModal from "../NewCategoryModal/NewCategoryModal";
import DataSearchBar from "../DataSearchBar/DataSearchBar";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import Badge from "../Badge/Badge";
import "./CompanySettingCategories.scss";

export default function CompanySettingsMembers() {
  const { userToken } = useContext(AuthContext);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const { companyInfos } = useContext(CompanyContext);
  const [companyCategories, setCompanyCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/colors`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (companyInfos.id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          setCompanyCategories(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [companyInfos]);

  const handleCategoryDelete = (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setCompanyCategories((prevCompanyCategories) => {
          return prevCompanyCategories.filter((user) => user.id !== id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const sorting = (column) => {
    if (order === "asc") {
      const sortedData = [...companyCategories].sort((a, b) => {
        let aData;
        if (!a[column]) {
          aData = "";
        } else {
          aData = a[column];
        }
        let bData;
        if (!b[column]) {
          bData = "";
        } else {
          bData = b[column];
        }
        return aData.toLowerCase() > bData.toLowerCase() ? 1 : -1;
      });
      setCompanyCategories(sortedData);
      setOrder("desc");
    } else {
      const sortedData = [...companyCategories].sort((a, b) => {
        let aData;
        if (!a[column]) {
          aData = "";
        } else {
          aData = a[column];
        }
        let bData;
        if (!b[column]) {
          bData = "";
        } else {
          bData = b[column];
        }
        return aData.toLowerCase() < bData.toLowerCase() ? 1 : -1;
      });
      setCompanyCategories(sortedData);
      setOrder("asc");
    }
  };

  return (
    <section id="categories">
      <div className="table">
        <div className="table-header">
          <div className="content">
            <h2>Catégories de l’entreprise</h2>
            <p>Affectez une ou plusieurs catégories à vos idées.</p>
          </div>
          <div className="actions">
            <DataSearchBar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              placeholderText="Rechercher une catégorie"
            />
            <button
              type="button"
              className="button-md-primary-solid"
              onClick={() => {
                setIsNewCategoryModalOpen(true);
              }}
            >
              <i className="fi fi-rr-user-add" />
              Ajouter une catégorie
            </button>
          </div>
        </div>
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th onClick={() => sorting("name")}>Catégories</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyCategories &&
                companyCategories
                  .filter((value) => {
                    if (searchTerm === "") {
                      return true;
                    }
                    if (
                      value.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((user) => (
                    <tr key={user.id}>
                      <td className="user">
                        <div className="infos">
                          <div className="name">
                            <Badge color={colors[user.color_id].name}>
                              {user.name}
                            </Badge>
                          </div>
                        </div>
                      </td>

                      <td className="actions">
                        <button
                          type="button"
                          className="table-action delete"
                          onClick={() => handleCategoryDelete(user.id)}
                        >
                          <i className="fi fi-rr-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      {isNewCategoryModalOpen && (
        <NewCategoryModal
          setIsNewCategoryModalOpen={setIsNewCategoryModalOpen}
        />
      )}
    </section>
  );
}

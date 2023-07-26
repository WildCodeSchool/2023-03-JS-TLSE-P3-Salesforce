import { useState, useEffect, useContext } from "react";
import axios from "axios";

import "./CompanySettingsMembers.scss";

import NewUserModal from "../NewUserModal/NewUserModal";
import Avatar from "../Avatar/Avatar";
import DataSearchBar from "../DataSearchBar/DataSearchBar";

import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

export default function CompanySettingsMembers() {
  const { userToken } = useContext(AuthContext);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const { companyInfos } = useContext(CompanyContext);
  const [companyUsers, setCompanyUsers] = useState([]);
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (companyInfos.id) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/companies/${
            companyInfos.id
          }/users`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          setCompanyUsers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [companyInfos, isNewUserModalOpen]);

  const sorting = (column) => {
    if (order === "asc") {
      const sortedData = [...companyUsers].sort((a, b) => {
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
      setCompanyUsers(sortedData);
      setOrder("desc");
    } else {
      const sortedData = [...companyUsers].sort((a, b) => {
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
      setCompanyUsers(sortedData);
      setOrder("asc");
    }
  };

  const handleUserDelete = (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setCompanyUsers((prevCompanyUsers) => {
          return prevCompanyUsers.filter((user) => user.id !== id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <section id="members">
      <div className="table">
        <div className="table-header">
          <div className="content">
            <h2>Membres de l’entreprise</h2>
            <p>Contrôlez l'accès et les permissions des membres.</p>
          </div>
          <div className="actions">
            <DataSearchBar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              placeholderText="Rechercher un membre"
            />
            <button
              type="button"
              className="button-md-primary-solid"
              onClick={() => {
                setIsNewUserModalOpen(true);
              }}
            >
              <i className="fi fi-rr-user-add" />
              Ajouter un membre
            </button>
          </div>
        </div>
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th onClick={() => sorting("lastname")}>Prénom NOM</th>
                <th onClick={() => sorting("function")}>Fonction</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyUsers
                .filter((value) => {
                  if (searchTerm === "") {
                    return true;
                  }
                  if (
                    value.firstname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    value.lastname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    value.email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    value.function
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
                      <Avatar
                        type="table"
                        pictureUrl={user.picture_url ? user.picture_url : null}
                        initials={
                          !user.picture_url
                            ? user.firstname[0] + user.lastname[0]
                            : null
                        }
                      />
                      <div className="infos">
                        <div className="name">
                          {user.firstname} {user.lastname.toUpperCase()}
                        </div>
                        <div className="email">{user.email}</div>
                      </div>
                    </td>
                    <td>{user.function}</td>
                    <td className="actions">
                      <button type="button" className="table-action edit">
                        <i className="fi fi-rr-pen-clip" />
                      </button>
                      <button
                        type="button"
                        className="table-action delete"
                        onClick={() => handleUserDelete(user.id)}
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
      {isNewUserModalOpen && (
        <NewUserModal setIsNewUserModalOpen={setIsNewUserModalOpen} />
      )}
    </section>
  );
}

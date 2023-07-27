/* eslint-disable camelcase */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import propTypes from "prop-types";
import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";
import "./NewCollaboratorModal.scss";
import DataSearchBar from "../DataSearchBar/DataSearchBar";
import Avatar from "../Avatar/Avatar";
import Alert from "../Alert/Alert";

export default function NewCollaboratorModal({
  setIsNewCollaboratorModalOpen,
}) {
  const { companyInfos } = useContext(CompanyContext);
  const { userToken, userInfos } = useContext(AuthContext);
  const { workspace_id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [companyUsers, setCompanyUsers] = useState([]);
  const [usersByWorkspace, setUsersByWorkspace] = useState([]);
  const [usersByTeam, setUsersByTeam] = useState([]);
  const [teamUserIds, setTeamUserIds] = useState([]);
  const [workspaceUserIds, setWorkspaceUserIds] = useState([]);
  const [isUserAdded, setIsUserAdded] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(false);

  useEffect(() => {
    // get users from company
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
      });
    // get users by workspace
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/workspaces/${workspace_id}/users`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        setUsersByWorkspace(response.data);
        setWorkspaceUserIds(response.data.map((user) => user.id));
        setIsUserAdded(false);
        setIsUserDeleted(false);
      });
  }, [isUserAdded, isUserDeleted]);

  // get the team of the workspace

  // get the users of the team using the team_id

  useEffect(() => {
    const promise = axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/workspaces/${workspace_id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        Promise.all([promise])
          .then(() => {
            axios
              .get(
                `${import.meta.env.VITE_BACKEND_URL}/teams/${
                  response.data[0].team_id
                }/users`,
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                }
              )
              .then((res) => {
                setUsersByTeam(res.data);
                const arrayTeamUserIds = res.data.map((user) => user.id);
                setTeamUserIds(arrayTeamUserIds);
                setIsUserAdded(false);
                setIsUserDeleted(false);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, [companyInfos.id, isUserAdded, isUserDeleted]);

  // post a user in a workspace

  const handleValideAccessWorkspace = (userId) => {
    axios
      .post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/workspaces/${workspace_id}/users/${userId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setIsUserAdded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteAccessWorkspace = (userId) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/workspaces/
    ${workspace_id}
    /users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setIsUserDeleted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let allIdsIncludedInWorkspace = true;
  if (workspaceUserIds && teamUserIds) {
    for (let i = 0; i < workspaceUserIds.length; i += 1) {
      if (!teamUserIds.includes(workspaceUserIds[i])) {
        allIdsIncludedInWorkspace = false;
        break;
      }
    }
  }
  let allIdsIncludedInCompanyOrWorkspaceOrTeam = true;

  if (workspaceUserIds && teamUserIds && companyUsers) {
    for (let i = 0; i < companyUsers.length; i += 1) {
      if (
        !teamUserIds.includes(companyUsers[i].id) &&
        !workspaceUserIds.includes(companyUsers[i].id)
      ) {
        allIdsIncludedInCompanyOrWorkspaceOrTeam = false;
        break;
      }
    }
  }

  return (
    userToken &&
    Object.keys(userInfos).length && (
      <div className="modal new-collaborator-modal">
        <div
          className="filter"
          onClick={() => setIsNewCollaboratorModalOpen(false)}
          aria-hidden="true"
        />
        <div className="container">
          <div className="header">
            <div className="icon">
              <i className="fi fi-rr-user-add" />
            </div>
            <div className="content">
              <h3>Collaborez</h3>
              <p className="details">
                Donnez vie à vos idées en collaborant avec votre équipe.
              </p>
            </div>
            <button
              className="close"
              onClick={() => setIsNewCollaboratorModalOpen(false)}
              type="button"
            >
              <i className="fi fi-rr-cross" />
            </button>
          </div>
          <div className="body">
            <div className="form">
              {usersByTeam.length !== 0 && (
                <div className="members-team-modal">
                  <p className="label">Membres de l'équipe</p>
                  {usersByTeam.length > 0 &&
                    usersByTeam.map((user) => (
                      <div className="user-and-infos" key={user.id}>
                        <div className="user">
                          <Avatar
                            type="table"
                            pictureUrl={user.picture_url || null}
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
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {!allIdsIncludedInWorkspace ? (
                <div className="search-results">
                  <p className="label">Membres de l'espace de travail</p>
                  {usersByWorkspace.length !== 0 &&
                    usersByWorkspace.map(
                      (user) =>
                        !teamUserIds.includes(user.id) && (
                          <div className="user-and-infos">
                            <div className="user" key={user.id}>
                              <Avatar
                                type="table"
                                pictureUrl={user.picture_url || null}
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
                            </div>
                            <div className="actions">
                              <button
                                className="remove"
                                type="button"
                                onClick={() => {
                                  handleDeleteAccessWorkspace(user.id);
                                }}
                              >
                                <i className="fi fi-rr-remove-user" />
                              </button>
                            </div>
                          </div>
                        )
                    )}
                </div>
              ) : null}

              <div className="input-line">
                <div className="input-field">
                  <p className="label">Adresse email</p>
                  <div className="input-help">
                    Renseignez l'adresse mail du membre de votre entreprise avec
                    qui collaborer
                  </div>
                  <DataSearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    placeholderText="Rechercher un membre"
                  />
                </div>
                <div className="search-results">
                  {allIdsIncludedInCompanyOrWorkspaceOrTeam ? (
                    <Alert
                      type="grey"
                      title="Aucun membre"
                      text="Tous les membres ont déjà été ajoutés."
                      icon="user-slash"
                    />
                  ) : (
                    companyUsers
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
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return true;
                        }
                        return false;
                      })
                      .map(
                        (user) =>
                          !teamUserIds.includes(user.id) &&
                          !workspaceUserIds.includes(user.id) && (
                            <div className="user-and-infos" key={user.id}>
                              <div className="user">
                                <Avatar
                                  type="table"
                                  pictureUrl={user.picture_url || null}
                                  initials={
                                    !user.picture_url
                                      ? user.firstname[0] + user.lastname[0]
                                      : null
                                  }
                                />
                                <div className="infos">
                                  <div className="name">
                                    {user.firstname}{" "}
                                    {user.lastname.toUpperCase()}
                                  </div>
                                  <div className="email">{user.email}</div>
                                </div>
                              </div>
                              {}
                              <div className="actions">
                                <button
                                  className="submit"
                                  type="button"
                                  onClick={() => {
                                    handleValideAccessWorkspace(user.id);
                                  }}
                                >
                                  <i className="fi fi-rr-user-add" />
                                </button>
                              </div>
                            </div>
                          )
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

NewCollaboratorModal.propTypes = {
  setIsNewCollaboratorModalOpen: propTypes.func,
};

NewCollaboratorModal.defaultProps = {
  setIsNewCollaboratorModalOpen: () => {},
};

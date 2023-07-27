/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Workspace.scss";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import PageHeader from "../../components/PageHeader/PageHeader";
import NavBar from "../../components/NavBar/NavBar";
import Home from "../Home/Home";
import IdeaCardWorkspace from "../../components/IdeaCardWorkspace/IdeaCardWorkspace";
import NewCollaboratorModal from "../../components/NewCollaboratorModal/NewCollaboratorModal";
import NewDeleteUsersByWorkspaceModal from "../../components/NewDeleteUsersByWorkspaceModal/NewDeleteUsersByWorkspaceModal";
import NewIdeaModal from "../../components/NewIdeaModal/NewIdeaModal";
import Alert from "../../components/Alert/Alert";
import ModifiedIdeaModal from "../../components/ModifiedIdeaModal/ModifiedIdeaModal";

export default function Workspace() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos } = useContext(CompanyContext);
  const { company_slug, workspace_id } = useParams();
  const [dataUsersByCompany, setDataUsersByCompany] = useState([]);
  const [isLoadingDataUsers, setIsLoadingDataUsers] = useState(true);
  const [dataUsersByTeam, setDataUsersByTeam] = useState([]);
  const [dataIdeasWorkspace, setDataIdeasWorkspace] = useState([]);
  const [isLoadingDataIdeasWorkspace, setIsLoadingDataIdeasWorkspace] =
    useState(true);

  const [isNewCollaboratorModalOpen, setIsNewCollaboratorModalOpen] =
    useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const [alertSuccessSave, setAlertSuccessSave] = useState(false);
  const [higherZIndex, setHigherZIndex] = useState(1);
  const [isModifiedIdeaModalOpen, setIsModifiedIdeaModalOpen] = useState(false);
  const [isIdeaDeleted, setIsIdeaDeleted] = useState(false);
  const [dataThisIdea, setDataThisIdea] = useState({});

  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: company_slug,
    }));
  }, [company_slug]);

  useEffect(() => {
    const promise = axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/workspaces/${workspace_id}/users`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        setDataUsersByCompany(response.data);
        setIsLoadingDataUsers(false);

        Promise.all([promise])
          .then(() => {
            axios
              .get(
                `${import.meta.env.VITE_BACKEND_URL}/teams/${
                  response.data[0].team_id
                }/users`,
                {
                  headers: { Authorization: `Bearer ${userToken}` },
                }
              )
              .then((res) => {
                setDataUsersByTeam(res.data);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, [workspace_id]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/workspaces/${workspace_id}/ideas/${
          userInfos.id
        }`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        setDataIdeasWorkspace(res.data);
        setIsLoadingDataIdeasWorkspace(false);
      });
  }, [
    workspace_id,
    userInfos.id,
    isNewIdeaModalOpen,
    isIdeaDeleted,
    isModifiedIdeaModalOpen,
  ]);

  let creationDateWorkspaceInitial;
  let creationDateWorkspaceSplited;
  let creationDateDayFirst;
  let creationDateWorkspace;

  if (!isLoadingDataUsers) {
    creationDateWorkspaceInitial = dataUsersByCompany[0].creation_date;
    creationDateWorkspaceSplited = creationDateWorkspaceInitial.split("T");
    creationDateDayFirst = creationDateWorkspaceSplited[0].split("-");
    creationDateWorkspace = `${creationDateDayFirst[2]}/${creationDateDayFirst[1]}/${creationDateDayFirst[0]}`;
  }

  // for save ideas and their position in workspace

  const handleSaveIdeas = () => {
    dataIdeasWorkspace.forEach((idea) => {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/ideas/${idea.id}`, idea, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          if (res.affectedRows === 0) {
            console.error("L'idée n'a pas été modifiée");
          } else {
            setAlertSuccessSave(true);
            setTimeout(() => {
              setAlertSuccessSave(false);
            }, 3000);
          }
        })
        .catch((err) => {
          console.error(err).sendStatus(500);
        });
    });
  };

  return userToken &&
    Object.keys(userInfos).length &&
    (dataUsersByCompany.includes(userInfos.id) ||
      dataUsersByTeam.includes(userInfos.id) ||
      userInfos.is_salesforce_admin) ? (
    <main>
      <NavBar activeLink="workspace" />
      {!isLoadingDataUsers && (
        <PageHeader
          title={dataUsersByCompany[0].name}
          subtitle={`${dataUsersByCompany[0].team_name} • Créé le  : ${creationDateWorkspace}`}
        >
          <div className="actions">
            <button
              className="button-md-grey-outline"
              type="button"
              onClick={() => {
                setIsNewCollaboratorModalOpen(true);
              }}
            >
              <i className="fi fi-rr-users" />
              Collaborer
            </button>
            {isNewCollaboratorModalOpen && (
              <NewCollaboratorModal
                setIsNewCollaboratorModalOpen={setIsNewCollaboratorModalOpen}
              />
            )}
            <button
              className="button-primary-solid"
              type="button"
              onClick={handleSaveIdeas}
            >
              Sauvegarder
            </button>
          </div>
        </PageHeader>
      )}
      {alertSuccessSave && (
        <div className="part-alert-success">
          <Alert
            type="success"
            text="Espace de travail sauvegardé"
            icon="assept-document"
          />
        </div>
      )}
      {isIdeaDeleted && (
        <div className="part-alert-success">
          <Alert
            type="success"
            title=""
            text="Idée supprimée"
            icon="lightbulb-slash"
          />
        </div>
      )}
      <div className="board-container">
        <div className="create-and-search-ideas-workspace">
          <button
            className="button-md-primary-solid"
            type="button"
            onClick={() => setIsNewIdeaModalOpen(true)}
          >
            <i className="fi fi-rr-plus" />
            Ajouter une idée
          </button>
          <button
            className="button-md-red-outline"
            type="button"
            onClick={() => {
              setOpenAlertDelete(true);
            }}
          >
            <i className="fi fi-rr-broom" />
            Effacer toutes les idées
          </button>
          {openAlertDelete && (
            <NewDeleteUsersByWorkspaceModal
              setOpenAlertDelete={setOpenAlertDelete}
              setDataIdeasWorkspace={setDataIdeasWorkspace}
            />
          )}
        </div>
        {isNewIdeaModalOpen && (
          <NewIdeaModal
            isNewIdeaModalOpen={isNewIdeaModalOpen}
            setIsNewIdeaModalOpen={setIsNewIdeaModalOpen}
          />
        )}

        <div className="large-container-workspace">
          <div
            className="box"
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
              overflow: "scroll",
              padding: "0",
            }}
          >
            <div className="global-ideas-workspace">
              <div className="ideas-workspace">
                <div
                  className="box"
                  style={{
                    height: "3000px",
                    width: "3000px",
                    position: "relative",
                    zIndex: 0,

                    padding: "0",
                  }}
                >
                  <div className="container-idea-draggable">
                    <div className="idea-cards-workspace">
                      <div
                        style={{
                          height: "3000px",
                          width: "3000px",
                        }}
                      >
                        {!isLoadingDataIdeasWorkspace &&
                          dataIdeasWorkspace.map((idea) => (
                            <IdeaCardWorkspace
                              key={idea.id}
                              idea={idea}
                              setDataIdeasWorkspace={setDataIdeasWorkspace}
                              setHigherZIndex={setHigherZIndex}
                              higherZIndex={higherZIndex}
                              setIsModifiedIdeaModalOpen={
                                setIsModifiedIdeaModalOpen
                              }
                              setIsIdeaDeleted={setIsIdeaDeleted}
                              setDataThisIdea={setDataThisIdea}
                              isModifiedIdeaModalOpen={isModifiedIdeaModalOpen}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="drag-and-drop-workspace" />
          </div>
        </div>
        {/*  il faut insérer la modale ici pour le css sinon ça bug. On doit faire passer les props dont l'id de l'idea en question */}
        {isModifiedIdeaModalOpen && (
          <ModifiedIdeaModal
            setIsModifiedIdeaModalOpen={setIsModifiedIdeaModalOpen}
            dataIdeasWorkspace={dataIdeasWorkspace}
            setDataIdeasWorkspace={setDataIdeasWorkspace}
            currentIdea={dataThisIdea}
            setCurrentIdea={setDataThisIdea}
          />
        )}
      </div>
    </main>
  ) : (
    <Home />
  );
}

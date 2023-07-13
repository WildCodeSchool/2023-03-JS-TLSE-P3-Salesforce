/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Draggable from "react-draggable";
import "./Workspace.scss";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import PageHeader from "../../components/PageHeader/PageHeader";
import NavBar from "../../components/NavBar/NavBar";
import Home from "../Home/Home";
import SearchBar from "../../components/SearchBar/SearchBar";
import IdeaCardWorkspace from "../../components/IdeaCardWorkspace/IdeaCardWorkspace";
import ModalNewIdea from "../../components/ModalNewIdea/ModalNewIdea";

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
  const [isModalNewIdeaOpen, setIsModalNewIdeaOpen] = useState(false);

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
  }, [workspace_id, userInfos.id]);

  let creationDateWorkspaceInitial;
  let creationDateWorkspaceSplited;
  let creationDateDayFirst;
  let creationDateWorkspace;

  if (!isLoadingDataUsers) {
    creationDateWorkspaceInitial = dataUsersByCompany[0].creation_date;
    creationDateWorkspaceSplited = creationDateWorkspaceInitial.split("T");
    creationDateDayFirst = creationDateWorkspaceSplited[0].split("-");
    creationDateWorkspace = `${creationDateDayFirst[2]}-${creationDateDayFirst[1]}-${creationDateDayFirst[0]}`;
  }

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
          subtitle={`Date de création : ${creationDateWorkspace}, Équipe "${dataUsersByCompany[0].team_name}"`}
        >
          <div className="actions">
            <button className="button-md-red-outline" type="button">
              <i className="fi fi-rr-trash" />
              Supprimer
            </button>
            <button className="button-md-grey-outline" type="button">
              <i className="fi fi-rr-users" />
              Collaborer
            </button>
            <button className="button-primary-solid" type="button">
              Sauvegarder
            </button>
          </div>
        </PageHeader>
      )}

      <div className="board-container">
        <div className="create-and-search-ideas-workspace">
          <button
            className="button-md-primary-solid"
            type="button"
            onClick={() => setIsModalNewIdeaOpen(true)}
          >
            <i className="fi fi-rr-plus" />
            Ajouter une idée
          </button>

          <div className="search-ideas-workspace">
            <SearchBar />
            <div className="filter-and-selecting">
              <button className="button-md-grey-outline" type="button">
                <i className="fi-rr-angle-small-down" />
                trier
              </button>
              <button className="button-md-grey-outline" type="button">
                <i className="i fi-rr-bars-filter" />
                filtrer
              </button>
            </div>
          </div>
        </div>
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
                            <IdeaCardWorkspace key={idea.id} idea={idea} />
                          ))}
                      </div>
                    </div>
                    <Draggable bounds="parent">
                      <div>
                        <IdeaCardWorkspace />
                      </div>
                    </Draggable>
                  </div>
                </div>
              </div>
            </div>
            <div className="drag-and-drop-workspace" />
          </div>
        </div>
      </div>
      {isModalNewIdeaOpen && (
        <ModalNewIdea setIsModalNewIdeaOpen={setIsModalNewIdeaOpen} />
      )}
    </main>
  ) : (
    <Home />
  );
}

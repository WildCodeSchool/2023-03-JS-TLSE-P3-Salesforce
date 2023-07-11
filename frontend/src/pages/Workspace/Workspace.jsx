/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Workspace.scss";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import PageHeader from "../../components/PageHeader/PageHeader";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import NavBar from "../../components/NavBar/NavBar";
import Connection from "../../components/Connection/Connection";
import SearchBar from "../../components/SearchBar/SearchBar";
import IdeaCard from "../../components/IdeaCard/IdeaCard";

export default function Workspace() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos } = useContext(CompanyContext);
  const { company_id, workspace_id, team_id } = useParams();
  const [dataUsersByCompany, setDataUsersByCompany] = useState([]);
  const [isLoadingDataUsers, setIsLoadingDataUsers] = useState(true);
  const [dataUsersByTeam, setDataUsersByTeam] = useState([]);
  const [isLoadingDataByTeam, setIsLoadingDataByTeam] = useState(true);

  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      id: company_id,
    }));
  }, [company_id]);

  let userCompaniesArray = [];
  if (Object.keys(userInfos).length) {
    if (userInfos.companies) {
      userCompaniesArray = userInfos.companies.split(",");
    }
  }

  // have all users for a workspace
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/workspaces/${workspace_id}/users`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        setDataUsersByCompany(response.data);
        setIsLoadingDataUsers(false);
        console.info(response.data);
      });
  }, [workspace_id]);

  // have all users for a team
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/teams/${team_id}/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setDataUsersByTeam(res.data);
        setIsLoadingDataByTeam(false);
        console.info(res.data);
      });
  }, [team_id]);

  // vérifier si le user fait parti du workspace d'une company
  // il faut récupérer les utilisateurs du workspace d'une entreprise + récupérer les utilisateurs d'une team d'une entreprise
  // ensuite il faut voir si l'id de l'utilisateur est compris dans l'une ou l'autre de ses données.

  return (
    // !isLoadingDataUsers &&
    // !isLoadingDataByTeam &&
    // userToken &&
    // Object.keys(userInfos).length &&
    // (dataUsersByCompany.includes(userInfos.id) ||
    //   dataUsersByTeam.includes(userInfos.id)) &&
    // userInfos.is_salesforce_admin ? (
    <main>
      <NavBar activeLink="workspace" />
      <PageHeader
        title="titre du workspace"
        subtitle="titre de l'équipe, date de création du workspace"
      >
        <HorizontalTabs type="tabs">
          <li className="active">Supprimer</li>
          <li>Collaborer</li>
          <li className="button-primary-solid">Sauvegarder</li>
        </HorizontalTabs>
      </PageHeader>
      <div className="large-container-workspace">
        <div className="global-ideas-workspace">
          <div className="create-and-search-ideas-workspace">
            <button className="button-primary-solid" type="button">
              <i className="fi fi-rr-plus" />
              Ajouter une idée
            </button>

            <div className="search-ideas-workspace">
              <SearchBar />
              <button className="button-primary-solid" type="button">
                <i className="fi fi-rr-plus" />
                trier
              </button>
              <button className="button-primary-solid" type="button">
                <i className="fi fi-rr-plus" />
                filtrer
              </button>
              <div className="filter-and-selecting" />
            </div>
          </div>
          <div className="ideas-workspace">
            <IdeaCard />
            <IdeaCard />
          </div>
        </div>
        <div className="drag-and-drop-workspace" />
      </div>
    </main>
  );
  // : (
  //   <Connection />
  // );
}

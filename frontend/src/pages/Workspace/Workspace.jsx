/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Workspace.scss";

import PageHeader from "../../components/PageHeader/PageHeader";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import NavBar from "../../components/NavBar/NavBar";

import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

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

  //   if (!isLoadingDataUsers) {
  //     console.log(dataUsersByCompany);
  //   }
  // have all users for a tem
  //   useEffect(() => {
  //     axios
  //       .get(`${import.meta.env.VITE_BACKEND_URL}/teams/${team_id}/users`, {
  //         headers: { Authorization: `Bearer ${userToken}` },
  //       })
  //       .then((res) => {
  //         setDataUsersByTeam(res.data);
  //         setIsLoadingDataByTeam(false);
  //         console.info(res.data);
  //       });
  //   }, [team_id]);

  const navigate = useNavigate();
  // vérifier si le user fait parti du workspace d'une company
  // il faut récupérer les utilisateurs du workspace d'une entreprise + récupérer les utilisateurs d'une team d'une entreprise
  // ensuite il faut voir si l'id de l'utilisateur est compris dans l'une ou l'autre de ses données.
  // && (userCompaniesArray.includes(company_id) ||
  // userInfos.is_salesforce_admin
  return (
    //   userToken && Object.keys(userInfos).length ? (
    <div className="global-page-workspace">
      <NavBar activeLink="worspace" />
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
    </div>
  );
  //   ) : (
  //     navigate(`/${company_id}`)
  //   );
}

/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Draggable, { DraggableCore } from "react-draggable";
import "./Workspace.scss";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import PageHeader from "../../components/PageHeader/PageHeader";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import NavBar from "../../components/NavBar/NavBar";
import Home from "../Home/Home";
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

  // have all users for a workspace and team_id
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
      });
  }, [workspace_id]);

  // have all users for a team*
  // if (!isLoadingDataUsers === true) {
  //   console.log(!isLoadingDataUsers);
  //   console.log(dataUsersByCompany[0].team_id);
  //   useEffect(() => {
  //     axios
  //       .get(
  //         `${import.meta.env.VITE_BACKEND_URL}/teams/${
  //           dataUsersByCompany.team_id
  //         }/users`,
  //         {
  //           headers: { Authorization: `Bearer ${userToken}` },
  //         }
  //       )
  //       .then((res) => {
  //         setDataUsersByTeam(res.data);
  //         setIsLoadingDataByTeam(false);
  //         console.info(res.data);
  //       });
  //   }, [dataUsersByCompany.team_id]);
  // } else {
  //   console.info("nein nein nein");
  // }

  // DRAG AND DROP FICHIER GITHUB (https://github.com/react-grid-layout/react-draggable/blob/master/example/example.js)

  // vérifier si le user fait parti du workspace d'une company
  // il faut récupérer les utilisateurs du workspace d'une entreprise + récupérer les utilisateurs d'une team d'une entreprise
  // ensuite il faut voir si l'id de l'utilisateur est compris dans l'une ou l'autre de ses données.

  return (
    // !isLoadingDataUsers &&
    //   !isLoadingDataByTeam &&
    //   userToken &&
    //   Object.keys(userInfos).length &&
    //   (dataUsersByCompany.includes(userInfos.id) ||
    //     dataUsersByTeam.includes(userInfos.id)) &&
    //   userInfos.is_salesforce_admin ? (
    <main>
      <NavBar activeLink="workspace" />
      <PageHeader
        title="titre du workspace"
        subtitle="titre de l'équipe, date de création du workspace"
      >
        <div className="actions">
          <button className="button-md-red-outline" type="button">
            <i className="fi fi-rr-trash" />
            Supprimer
          </button>
          <button className="button-md-grey-outline" type="button">
            <i className="fi fi-rr-trash" />
            Collaborer
          </button>
          <button className="button-primary-solid" type="button">
            Sauvegarder
          </button>
        </div>
      </PageHeader>

      <div className="large-container-workspace">
        <div
          className="box"
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            // overflow: "auto",
            padding: "0",
          }}
        >
          <div style={{ height: "1000px", width: "1000px", padding: "10px" }}>
            <div className="global-ideas-workspace">
              <div className="create-and-search-ideas-workspace">
                <button className="button-md-primary-solid" type="button">
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

              <div className="ideas-workspace">
                <Draggable
                  bounds="parent"
                  // axis="x"
                  // // handle=".handle"
                  // defaultPosition={{ x: 0, y: 0 }}
                  // // position={null}
                  // grid={[25, 25]}
                  // scale={1}
                  // // onStart={this.handleStart}
                  // // onDrag={this.handleDrag}
                  // // onStop={this.handleStop}
                >
                  <div>
                    <IdeaCard />
                  </div>
                </Draggable>
                <Draggable>
                  <div>
                    <IdeaCard />
                  </div>
                </Draggable>
              </div>
            </div>
            <div className="drag-and-drop-workspace" />
            {/* </Draggable> */}
          </div>
        </div>
      </div>
    </main>
  );
  // : (
  //   <Home />
  // );
}

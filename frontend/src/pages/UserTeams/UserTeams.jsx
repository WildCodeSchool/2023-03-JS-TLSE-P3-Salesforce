/* eslint-disable camelcase */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanitize } from "isomorphic-dompurify";

import axios from "axios";
import "./UserTeams.scss";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import TeamCard from "../../components/TeamCard/TeamCard";
import NavBar from "../../components/NavBar/NavBar";
import Connection from "../../components/Connection/Connection";
import DataSearchBar from "../../components/DataSearchBar/DataSearchBar";
import NewTeamModal from "../../components/NewTeamModal/NewTeamModal";

export default function UserTeams() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { company_slug } = useParams();
  const [dataTeam, setDataTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false);
  const [searchTermTeam, setSearchTermTeam] = useState("");

  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: sanitize(company_slug),
    }));
  }, [company_slug]);

  let userCompaniesArray = [];
  if (userToken && Object.keys(userInfos).length) {
    if (userInfos.companies) {
      userCompaniesArray = userInfos.companies.split(",");
    }
  }

  useEffect(() => {
    if (companyInfos.id && userInfos.id) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/companies/${
            companyInfos.id
          }/users/${userInfos.id}/teams/`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          setDataTeam(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching teams:", error);
        });
    }
  }, [companyInfos.id, userInfos.id]);

  return (
    <div>
      {userToken &&
      Object.keys(userInfos).length &&
      (userCompaniesArray.includes(companyInfos.id.toString()) ||
        userInfos.is_salesforce_admin) ? (
        <main>
          <NavBar activeLink="teams" />
          <PageHeader
            title="Mes équipes"
            subtitle="Voici l'ensemble des équipes dans lesquelles vous faites partie, souhaitez-vous en ajouter une autre?"
          >
            <button
              className="button-primary-solid"
              type="button"
              onClick={() => {
                setIsNewTeamModalOpen(true);
              }}
            >
              <i className="fi fi-rr-plus" />
              Ajouter une équipe
            </button>
          </PageHeader>
          <div className="page-actions">
            <DataSearchBar
              searchTerm={searchTermTeam}
              setSearchTerm={setSearchTermTeam}
              placeholderText="Rechercher une équipe"
            />
          </div>
          <div className="team-cards-list">
            {!isLoading &&
              dataTeam
                .filter((value) => {
                  if (searchTermTeam === "") {
                    return true;
                  }
                  // on recherche par nom ou via la description
                  const nameLower = value.name?.toLowerCase();
                  const descriptionLower = value.description?.toLowerCase();
                  // Vérification que les valeurs existent avant d'appeler toLowerCase()
                  return (
                    nameLower?.includes(searchTermTeam.toLowerCase()) ||
                    descriptionLower?.includes(searchTermTeam.toLowerCase())
                  );
                })
                .map((team) => <TeamCard key={team.id} team={team} />)}
          </div>
          {isNewTeamModalOpen && (
            <NewTeamModal
              isNewTeamModalOpen={isNewTeamModalOpen}
              setIsNewTeamModalOpen={setIsNewTeamModalOpen}
            />
          )}
        </main>
      ) : (
        <Connection />
      )}
    </div>
  );
}

UserTeams.defaultProps = {
  pagePart: "teams",
};

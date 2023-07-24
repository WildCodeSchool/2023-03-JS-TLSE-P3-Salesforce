/* eslint-disable camelcase */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanitize } from "isomorphic-dompurify";

import axios from "axios";
import "./Home.scss";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import IdeaCard from "../../components/IdeaCard/IdeaCard";
import TeamCard from "../../components/TeamCard/TeamCard";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import NavBar from "../../components/NavBar/NavBar";
import Connection from "../../components/Connection/Connection";
import NewTeamModal from "../../components/NewTeamModal/NewTeamModal";
import NewIdeaModal from "../../components/NewIdeaModal/NewIdeaModal";
import DataSearchBar from "../../components/DataSearchBar/DataSearchBar";

export default function Home() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { company_slug } = useParams();
  const [dataIdea, setDataIdea] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [pagePart, setPagePart] = useState("ideas");
  const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const [searchTermIdea, setSearchTermIdea] = useState("");
  const [searchTermTeam, setSearchTermTeam] = useState("");
  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: sanitize(company_slug),
    }));
  }, [company_slug]);

  let userCompaniesArray = [];
  if (Object.keys(userInfos).length) {
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
          }/ideas/${userInfos.id}/`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          setDataIdea(response.data);

          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching ideas:", error);
        });
    }
  }, [companyInfos.id, userInfos.id]);

  useEffect(() => {
    if (companyInfos.id) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/companies/${
            companyInfos.id
          }/teams`
        )
        .then((response) => {
          setTeams(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching teams:", error);
        });
    }
  }, [companyInfos.id]);

  let title = "";
  let subtitle = "";
  let buttonAdd = "Ajouter une idée";

  if (pagePart === "ideas") {
    if (userInfos.firstname) {
      subtitle = "Découvrez les dernières idées de votre entreprise";
      title = `Bienvenue, ${userInfos.firstname}`;
    } else {
      title = "Bienvenue";
    }
  } else if (pagePart === "teams") {
    title = "Équipes";
    subtitle = "Retrouvez toutes les équipes de votre entreprise";
    buttonAdd = "Ajouter une équipe";
  }

  return (
    <div>
      {pagePart === "ideas" && isNewIdeaModalOpen && (
        <NewIdeaModal
          isNewIdeaModalOpen={isNewIdeaModalOpen}
          setIsNewIdeaModalOpen={setIsNewIdeaModalOpen}
        />
      )}
      {userToken &&
      Object.keys(userInfos).length &&
      (userCompaniesArray.includes(companyInfos.id.toString()) ||
        userInfos.is_salesforce_admin) ? (
        <main>
          <NavBar activeLink="home" />
          <PageHeader title={title} subtitle={subtitle}>
            {pagePart === "teams" && (
              <button
                className="button-primary-solid"
                type="button"
                onClick={() => {
                  setIsNewTeamModalOpen(true);
                }}
              >
                <i className="fi fi-rr-plus" />
                {buttonAdd}
              </button>
            )}
            {pagePart === "ideas" && (
              <button
                className="button-primary-solid"
                type="button"
                onClick={() => {
                  setIsNewIdeaModalOpen(true);
                }}
              >
                <i className="fi fi-rr-plus" />
                {buttonAdd}
              </button>
            )}
            <HorizontalTabs type="tabs">
              <li
                className={pagePart === "ideas" ? "active" : null}
                type="button"
                onClick={() => {
                  setPagePart("ideas");
                }}
                aria-hidden="true"
              >
                Idées
              </li>
              <li
                className={pagePart === "teams" ? "active" : null}
                type="button"
                onClick={() => {
                  setPagePart("teams");
                }}
                aria-hidden="true"
              >
                Équipes
              </li>
            </HorizontalTabs>
          </PageHeader>
          {pagePart === "ideas" && (
            <>
              <div className="page-actions">
                <DataSearchBar
                  searchTerm={searchTermIdea}
                  setSearchTerm={setSearchTermIdea}
                  placeholderText="Rechercher une idée"
                />
              </div>

              <div className="idea-cards-list">
                {!isLoading &&
                  dataIdea
                    .filter((value) => {
                      if (searchTermIdea === "") {
                        return true;
                      }
                      if (
                        value.title
                          .toLowerCase()
                          .includes(searchTermIdea.toLowerCase()) ||
                        value.description
                          .toLowerCase()
                          .includes(searchTermIdea.toLowerCase()) ||
                        value.creator_firstname
                          .toLowerCase()
                          .includes(searchTermIdea.toLowerCase()) ||
                        value.creator_lastname
                          .toLowerCase()
                          .includes(searchTermIdea.toLowerCase())
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
              </div>
              {/* Ajouter la modale de l'idea ci-dessous */}
            </>
          )}

          {pagePart === "teams" && (
            <>
              <div className="page-actions">
                <DataSearchBar
                  searchTerm={searchTermTeam}
                  setSearchTerm={setSearchTermTeam}
                  placeholderText="Rechercher une équipe"
                />
              </div>
              <div>
                <div className="teams-card-container">
                  {teams
                    .filter((value) => {
                      if (searchTermTeam === "") {
                        return true;
                      }
                      if (
                        value.name
                          .toLowerCase()
                          .includes(searchTermTeam.toLowerCase()) ||
                        value.description
                          .toLowerCase()
                          .includes(searchTermTeam.toLowerCase()) ||
                        value.objective
                          .toLowerCase()
                          .includes(searchTermTeam.toLowerCase()) ||
                        value.status
                          .toLowerCase()
                          .includes(searchTermTeam.toLowerCase())
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((team) => {
                      return <TeamCard team={team} key={team.id} />;
                    })}
                </div>
                {isNewTeamModalOpen && (
                  <NewTeamModal
                    isNewTeamModalOpen={isNewTeamModalOpen}
                    setIsNewTeamModalOpen={setIsNewTeamModalOpen}
                  />
                )}

                {isNewIdeaModalOpen && (
                  <NewIdeaModal
                    isNewIdeaModalOpen={isNewIdeaModalOpen}
                    setIsNewIdeaModalOpen={setIsNewIdeaModalOpen}
                  />
                )}
              </div>
            </>
          )}
        </main>
      ) : (
        <Connection />
      )}
    </div>
  );
}
Home.defaultProps = {
  pagePart: "ideas",
};

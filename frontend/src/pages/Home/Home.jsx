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
import SearchBar from "../../components/SearchBar/SearchBar";
import Connection from "../../components/Connection/Connection";

export default function Home() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { company_slug } = useParams();
  const [dataIdea, setDataIdea] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [pagePart, setPagePart] = useState("ideas");

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
  }, [companyInfos.id, userInfos.id, userToken]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/companies/${companyInfos.id}/teams`
      )
      .then((response) => {
        setTeams(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
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
      {userToken &&
      Object.keys(userInfos).length &&
      (userCompaniesArray.includes(companyInfos.id.toString()) ||
        userInfos.is_salesforce_admin) ? (
        <main>
          <NavBar activeLink="home" />
          <PageHeader title={title} subtitle={subtitle}>
            <button className="button-primary-solid" type="button">
              <i className="fi fi-rr-plus" />
              {buttonAdd}
            </button>
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
          <div className="page-actions">
            <SearchBar />
          </div>
          {pagePart === "ideas" && (
            <div className="idea-cards-list">
              {!isLoading &&
                dataIdea.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
            </div>
          )}

          {pagePart === "teams" && (
            <div>
              <div className="teams-card-container">
                {teams.map((team) => {
                  return <TeamCard team={team} key={team.id} />;
                })}
              </div>
            </div>
          )}
        </main>
      ) : (
        <Connection />
      )}
    </div>
  );
}

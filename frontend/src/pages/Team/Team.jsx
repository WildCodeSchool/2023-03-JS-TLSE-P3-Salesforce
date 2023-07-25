/* eslint-disable camelcase */
import "./Team.scss";
import { useEffect, useContext, useState } from "react";
import { sanitize } from "isomorphic-dompurify";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// eslint-disable-next-line import/no-unresolved
import "@splidejs/react-splide/css";
import NavBar from "../../components/NavBar/NavBar";

import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";
import AvatarsList from "../../components/AvatarsList/AvatarsList";
import WorkspaceCard from "../../components/WorkspaceCard/WorkspaceCard";
import IdeaCard from "../../components/IdeaCard/IdeaCard";

export default function Team() {
  const navigate = useNavigate();
  const { company_slug, team_id } = useParams();
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { userToken, userInfos } = useContext(AuthContext);
  const [teamInfos, setTeamInfos] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamsWorkspaces, setTeamsWorkspaces] = useState([]);
  const [teamsIdeas, setTeamsIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  function testIfUserInTeam(userId) {
    return teamMembers.some((member) => member.id === userId);
  }

  useEffect(() => {
    if (companyInfos.id) {
      const endpoints = [
        `${import.meta.env.VITE_BACKEND_URL}/companies/${
          companyInfos.id
        }/teams/${team_id}`,
        `${import.meta.env.VITE_BACKEND_URL}/teams/${team_id}/users`,
        `${import.meta.env.VITE_BACKEND_URL}/teams/${team_id}/workspaces/${
          userInfos.id
        }`,
        `${import.meta.env.VITE_BACKEND_URL}/teams/${team_id}/ideas/${
          userInfos.id
        }`,
      ];
      Promise.all(
        endpoints.map((endpoint) =>
          axios.get(endpoint, {
            headers: { Authorization: `Bearer ${userToken}` },
          })
        )
      )
        .then(
          ([
            { data: dbTeams },
            { data: dbMembers },
            { data: dbWorkspaces },
            { data: dbTeamIdeas },
          ]) => {
            setTeamInfos(dbTeams[0]);
            setTeamMembers(dbMembers);
            setTeamsWorkspaces(dbWorkspaces);
            setTeamsIdeas(dbTeamIdeas);
            setIsLoading(false);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    }
  }, [team_id]);
  return (
    <div>
      {userToken &&
      Object.keys(userInfos).length &&
      (userCompaniesArray.includes(companyInfos.id.toString()) ||
        userInfos.is_salesforce_admin) ? (
        <main>
          <NavBar activeLink="teams" />
          <div className="team">
            {!isLoading && (
              <header>
                {teamInfos.picture_url && (
                  <div className="picture">
                    <img
                      src={teamInfos.picture_url}
                      alt={`Équipe : ${teamInfos.name}`}
                    />
                  </div>
                )}
                <div className="container">
                  <div className="content">
                    <h2>{teamInfos.name}</h2>
                    <p className="description">{teamInfos.description}</p>
                    <AvatarsList users={teamMembers} />
                  </div>
                  {testIfUserInTeam(userInfos.id) ||
                  userInfos.is_salesforce_admin ||
                  userInfos.is_company_admin ? (
                    <div className="actions">
                      <button type="button" className="button-md-grey-outline">
                        <i className="fi fi-rr-user-add" />
                        Ajouter un membre
                      </button>
                      <button type="button" className="button-md-primary-solid">
                        <i className="fi fi-rr-settings-sliders" />
                        Paramètres de l'équipe
                      </button>
                    </div>
                  ) : null}
                </div>
              </header>
            )}
            {teamsWorkspaces.length > 0 ? (
              <section className="workspaces">
                <div className="header">Espaces de travail d'équipe</div>

                <Splide
                  aria-label="Teams Workspaces"
                  className="container"
                  options={{
                    rewind: true,

                    focus: 0,
                    omitEnd: true,
                    arrows: false,
                    perPage: 3.5,
                    perMove: 1,
                    gap: "1rem",
                    pagination: false,
                    wheel: true,
                    breakpoints: {
                      1200: {
                        perPage: 2.5,
                      },
                      768: {
                        perPage: 1.25,
                      },
                    },
                  }}
                >
                  {teamsWorkspaces.map((workspace) => (
                    <SplideSlide key={workspace.id}>
                      <WorkspaceCard workspace={workspace} />
                    </SplideSlide>
                  ))}
                </Splide>
              </section>
            ) : null}
            {teamsIdeas.length > 0 ? (
              <section className="ideas">
                <div className="header">Idées d'équipe</div>

                <Splide
                  aria-label="Teams Ideas"
                  className="container"
                  options={{
                    rewind: true,

                    focus: 0,
                    omitEnd: true,
                    arrows: false,
                    perPage: 3.5,
                    perMove: 1,
                    gap: "1rem",
                    pagination: false,
                    wheel: true,
                    breakpoints: {
                      1200: {
                        perPage: 2.5,
                      },
                      768: {
                        perPage: 1.25,
                      },
                    },
                  }}
                >
                  {teamsIdeas.map((idea) => (
                    <SplideSlide key={idea.id}>
                      <IdeaCard idea={idea} />
                    </SplideSlide>
                  ))}
                </Splide>
              </section>
            ) : null}
          </div>
        </main>
      ) : (
        navigate(`/${company_slug}`)
      )}
    </div>
  );
}

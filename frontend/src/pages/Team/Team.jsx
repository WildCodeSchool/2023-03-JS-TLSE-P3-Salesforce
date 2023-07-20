/* eslint-disable camelcase */
import "./Team.scss";
import { useEffect, useContext, useState } from "react";
import { sanitize } from "isomorphic-dompurify";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";

import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";
import AvatarsList from "../../components/AvatarsList/AvatarsList";

export default function Team() {
  const navigate = useNavigate();
  const { company_slug, team_id } = useParams();
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { userToken, userInfos } = useContext(AuthContext);
  const [teamInfos, setTeamInfos] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamsWorkspaces, setTeamsWorkspaces] = useState([]);
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
          ]) => {
            setTeamInfos(dbTeams[0]);
            setTeamMembers(dbMembers);
            setTeamsWorkspaces(dbWorkspaces);
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
          </div>
          {teamsWorkspaces.length > 0 ? (
            <section className="workspaces">
              <div className="header">Tableaux d'équipe</div>
              <div className="container">
                {teamsWorkspaces.map((workspace) => (
                  <div className="test">{workspace.name}</div>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      ) : (
        navigate(`/${company_slug}`)
      )}
    </div>
  );
}

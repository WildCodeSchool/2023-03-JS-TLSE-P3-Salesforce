/* eslint-disable camelcase */
import "./Team.scss";
import { useEffect, useContext, useState } from "react";
import { sanitize } from "isomorphic-dompurify";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";

import CompanyContext from "../../contexts/CompanyContext";
import AuthContext from "../../contexts/AuthContext";
import AvatarsList from "../../components/AvatarsList/AvatarsList";

export default function Team() {
  const { company_slug, team_id } = useParams();
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { userToken } = useContext(AuthContext);
  const [teamInfos, setTeamInfos] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: sanitize(company_slug),
    }));
  }, [company_slug]);

  useEffect(() => {
    const endpoints = [
      `${import.meta.env.VITE_BACKEND_URL}/companies/${
        companyInfos.id
      }/teams/${team_id}`,
      `${import.meta.env.VITE_BACKEND_URL}/teams/${team_id}/users`,
    ];
    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
      )
    ).then(([{ data: dbAccess }, { data: dbStates }]) => {
      setTeamInfos(dbAccess);
      setTeamMembers(dbStates);
    });
  }, [team_id]);

  return (
    <main>
      <NavBar activeLink="teams" />
      <div className="team">
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
              <AvatarsList avatars={teamMembers} />
            </div>
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
          </div>
        </header>
      </div>
    </main>
  );
}

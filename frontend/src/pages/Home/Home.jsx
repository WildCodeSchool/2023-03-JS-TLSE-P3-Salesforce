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
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Connection from "../../components/Connection/Connection";

export default function Home() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { company_slug } = useParams();
  const [dataIdea, setDataIdea] = useState({});
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
  useEffect(() => {
    if ((companyInfos.id, userInfos.id)) {
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
        });
    }
  }, [companyInfos.id, userInfos.id]);

  return userToken &&
    Object.keys(userInfos).length &&
    (userCompaniesArray.includes(companyInfos.id.toString()) ||
      userInfos.is_salesforce_admin) ? (
    <main>
      <NavBar activeLink="home" />
      <PageHeader
        title={
          userInfos.firstname
            ? `Bienvenue, ${userInfos.firstname}`
            : "Bienvenue"
        }
        subtitle="Découvrez les dernières idées de votre entreprise"
      >
        <button className="button-primary-solid" type="button">
          <i className="fi fi-rr-plus" />
          Ajouter une idée
        </button>
        <HorizontalTabs type="tabs">
          <li className="active">Idées</li>
          <li>Équipes</li>
        </HorizontalTabs>
      </PageHeader>
      <div className="page-actions">
        <SearchBar />
      </div>
      <div className="idea-cards-list">
        {!isLoading &&
          dataIdea.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
      </div>
    </main>
  ) : (
    <Connection />
  );
}

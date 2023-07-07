/* eslint-disable camelcase */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  const { setCompanyInfos } = useContext(CompanyContext);
  const { company_id } = useParams();

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

  return userToken &&
    Object.keys(userInfos).length &&
    (userCompaniesArray.includes(company_id) ||
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
        <SearchBar />
        <button className="button-primary-solid" type="button">
          <i className="fi fi-rr-plus" />
          Ajouter une idée
        </button>
        <HorizontalTabs type="tabs">
          <li className="active">Idées</li>
          <li>Équipes</li>
        </HorizontalTabs>
      </PageHeader>
      <div className="page-actions" />
      <div className="idea-cards-list">
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
      </div>
    </main>
  ) : (
    <Connection />
  );
}

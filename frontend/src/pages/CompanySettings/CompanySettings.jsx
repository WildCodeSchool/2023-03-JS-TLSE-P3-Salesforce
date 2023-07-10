/* eslint-disable camelcase */
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { sanitize } from "isomorphic-dompurify";

import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";

import "../../components/IdeaCard/IdeaCard.scss";
import "./CompanySettings.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import NavBar from "../../components/NavBar/NavBar";
import NewUserModal from "../../components/NewUserModal/NewUserModal";

export default function CompanySettings() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos } = useContext(CompanyContext);
  const { company_id } = useParams();
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      id: sanitize(company_id),
    }));
  }, [company_id]);

  const navigate = useNavigate();

  return userToken &&
    Object.keys(userInfos).length &&
    (userInfos.is_company_admin || userInfos.is_salesforce_admin) ? (
    <main>
      <NavBar activeLink="settings" />
      <PageHeader
        title="Paramètres d’entreprise"
        subtitle="Définissez les paramètres pour une collaboration harmonieuse au sein de votre entreprise."
      >
        <button
          className="button-primary-solid"
          type="button"
          onClick={() => setIsNewUserModalOpen(true)}
        >
          <i className="fi fi-rr-user-add" />
          Ajouter un membre
        </button>
      </PageHeader>
      <HorizontalTabs type="underline">
        <li className="active">
          <i className="fi fi-rr-user-gear" />
          Membres
        </li>
        <li>
          <i className="fi fi-rr-tags" />
          Catégories
        </li>
        <li>
          <i className="fi fi-rr-swatchbook" />
          Personnalisation
        </li>
      </HorizontalTabs>
      {isNewUserModalOpen && (
        <NewUserModal setIsNewUserModalOpen={setIsNewUserModalOpen} />
      )}
    </main>
  ) : (
    navigate(`/${company_id}`)
  );
}

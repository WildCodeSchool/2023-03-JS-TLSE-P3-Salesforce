import PageHeader from "../components/PageHeader/PageHeader";
import IdeaCard from "../components/IdeaCard/IdeaCard";
import "../components/IdeaCard/IdeaCard.scss";
import HorizontalTabs from "../components/HorizontalTabs/HorizontalTabs";

export default function Home() {
  const firstname = "Pierre";

  return (
    <main>
      <PageHeader
        title={firstname ? `Bienvenue, ${firstname}` : "Bienvenue"}
        subtitle="Découvrez les dernières idées de votre entreprise"
      >
        <button className="button-primary-solid" type="button">
          <i className="fi fi-rr-plus" />
          Ajouter une idée
        </button>
        <HorizontalTabs type="tabs">
          <li className="active">Idées</li>
          <li>Groupes</li>
        </HorizontalTabs>
      </PageHeader>
      <IdeaCard />
      <IdeaCard />
      <IdeaCard />
    </main>
  );
}

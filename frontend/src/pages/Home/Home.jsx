import "../../components/IdeaCard/IdeaCard.scss";
import "./Home.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import IdeaCard from "../../components/IdeaCard/IdeaCard";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  const firstname = "Pierre";

  return (
    <main>
      <NavBar />
      <PageHeader
        title={firstname ? `Bienvenue, ${firstname}` : "Bienvenue"}
        subtitle="Découvrez les dernières idées de votre entreprise"
      >
        <SearchBar />
        <button className="button-primary-solid" type="button">
          <i className="fi fi-rr-plus" />
          Ajouter une idée
        </button>
        <HorizontalTabs type="tabs">
          <li className="active">Idées</li>
          <li>Groupes</li>
        </HorizontalTabs>
      </PageHeader>
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
  );
}

import PageHeader from "../components/PageHeader/PageHeader";
import IdeaCard from "../components/IdeaCard/IdeaCard";
import HorizontalTabs from "../components/HorizontalTabs/HorizontalTabs";
import NavBar from "../components/NavBar/NavBar";

export default function Home() {
  const firstname = "Pierre";

  return (
    <>
      <NavBar />
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
      </main>
    </>
  );
}

import Button from "../components/Button/Button";
import PageHeader from "../components/PageHeader/PageHeader";

import SearchBar from "../components/SearchBar/SearchBar";
// import IdeaCard from "../components/IdeaCard/IdeaCard";

export default function Home() {
  const firstname = "Pierre";

  return (
    <main>
      <PageHeader
        title={firstname ? `Bienvenue, ${firstname}` : "Bienvenue"}
        subtitle="Découvrez les dernières idées de votre entreprise"
      >
        <Button size="md" color="primary" type="solid">
          <i className="fi fi-rr-plus" />
          Ajouter une idée
        </Button>
      </PageHeader>
      <SearchBar />
      {/* <IdeaCard /> */}
    </main>
  );
}

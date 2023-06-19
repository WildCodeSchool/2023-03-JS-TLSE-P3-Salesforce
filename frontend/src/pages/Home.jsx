import Button from "../components/Button/Button";
import PageHeader from "../components/PageHeader/PageHeader";
import IdeaCard from "../components/IdeaCard/IdeaCard";
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
          <Button size="md" color="primary" type="solid">
            <i className="fi fi-rr-plus" />
            Ajouter une idée
          </Button>
        </PageHeader>
        <IdeaCard />
      </main>
    </>
  );
}

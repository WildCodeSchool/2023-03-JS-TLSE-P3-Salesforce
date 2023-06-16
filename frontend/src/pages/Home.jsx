import Button from "../components/Button/Button";
import PageHeader from "../components/PageHeader/PageHeader";

import IdeaCard from "../components/IdeaCard/IdeaCard";

export default function Home() {
  const firstname = "Pierre";
  let welcomeString = "";

  if (firstname) {
    welcomeString = `Bienvenue, ${firstname}`;
  } else {
    welcomeString = "Bienvenue";
  }
  return (

    <main>
      <PageHeader
        title={welcomeString}
        subtitle="Découvrez les dernières idées de votre entreprise"
      >
        <Button size="md" color="primary" type="solid">
          <i className="fi fi-rr-plus" />
          Ajouter une idée
        </Button>
      </PageHeader>
      <IdeaCard />
    </main>

  );
}

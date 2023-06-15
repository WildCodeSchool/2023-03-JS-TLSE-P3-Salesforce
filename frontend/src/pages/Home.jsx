import IdeaCard from "../components/IdeaCard/IdeaCard";

import NavBar from "../components/NavBar/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Home</h1>
        <IdeaCard />
      </main>
    </>
  );
}

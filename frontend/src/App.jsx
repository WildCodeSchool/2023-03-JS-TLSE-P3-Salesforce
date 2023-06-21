import Home from "./pages/Home";

import "./styles/reset.css";
import "./styles/index.scss";

import defineColorTheme from "../utils";

const colorTheme = "indigo";

defineColorTheme(colorTheme);

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Home from "./pages/Home";

import "./styles/reset.css";
import "./styles/index.scss";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [colorTheme, setColorTheme] = useState("indigo");

  function importThemeColor(colorThemeChosen) {
    switch (colorThemeChosen) {
      case "amber":
        import("./styles/colors-themes/amber-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
      case "blue":
        import("./styles/colors-themes/blue-color-theme.css").then((module) => {
          const style = document.createElement("style");
          style.textContent = module.default;
          document.head.appendChild(style);
        });
        break;
      case "cyan":
        import("./styles/colors-themes/cyan-color-theme.css").then((module) => {
          const style = document.createElement("style");
          style.textContent = module.default;
          document.head.appendChild(style);
        });
        break;
      case "emerald":
        import("./styles/colors-themes/emerald-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
      case "fuchsia":
        import("./styles/colors-themes/fuchsia-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
      case "green":
        import("./styles/colors-themes/green-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
      case "indigo":
        import("./styles/colors-themes/indigo-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
      case "lime":
        import("./styles/colors-themes/lime-color-theme.css").then((module) => {
          const style = document.createElement("style");
          style.textContent = module.default;
          document.head.appendChild(style);
        });
        break;
      case "orange":
        import("./styles/colors-themes/orange-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
      case "pink":
        import("./styles/colors-themes/pink-color-theme.css").then((module) => {
          const style = document.createElement("style");
          style.textContent = module.default;
          document.head.appendChild(style);
        });
        break;
      case "purple":
        import("./styles/colors-themes/purple-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
      case "red":
        import("./styles/colors-themes/red-color-theme.css").then((module) => {
          const style = document.createElement("style");
          style.textContent = module.default;
          document.head.appendChild(style);
        });
        break;
      case "rose":
        import("./styles/colors-themes/rose-color-theme.css").then((module) => {
          const style = document.createElement("style");
          style.textContent = module.default;
          document.head.appendChild(style);
        });
        break;
      case "sky":
        import("./styles/colors-themes/sky-color-theme.css").then((module) => {
          const style = document.createElement("style");
          style.textContent = module.default;
          document.head.appendChild(style);
        });
        break;
      case "teal":
        import("./styles/colors-themes/teal-color-theme.css").then((module) => {
          const style = document.createElement("style");
          style.textContent = module.default;
          document.head.appendChild(style);
        });
        break;

      case "violet":
        import("./styles/colors-themes/violet-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
      case "yellow":
        import("./styles/colors-themes/yellow-color-theme.css").then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;

      default:
        console.error(
          `Color theme '${colorThemeChosen}' not found in themeColors in utils.jsx. Indigo theme will be used instead.`
        );
        import(`./styles/colors-themes/indigo-color-theme.css`).then(
          (module) => {
            const style = document.createElement("style");
            style.textContent = module.default;
            document.head.appendChild(style);
          }
        );
        break;
    }
  }
  useEffect(() => {
    importThemeColor(colorTheme);
  }, [colorTheme]);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

import image from "./portrait.jpg";
import "./Avatar.scss";

function Avatar() {
  // state
  // instructions
  function handleMenu() {
    // route to page: mon compte
  }
  // render
  return (
    <div className="vignette">
      <option
        className="img"
        alt="Avatar"
        src={image}
        onClick={handleMenu}
        onKeyDown={handleMenu}
      />
    </div>
  );
}
export default Avatar;

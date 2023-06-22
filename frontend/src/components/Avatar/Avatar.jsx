import image from "./portrait.jpg";
import "./Avatar.scss";

function Avatar() {
  // state
  // instructions
  function HandleMenu() {
    // route to page: mon compte
  }
  // render
  return (
    <div className="vignette">
      <option
        className="vignette-img"
        alt="Avatar"
        src={image}
        onClick={HandleMenu}
        onKeyDown={HandleMenu}
      />
    </div>
  );
}
export default Avatar;

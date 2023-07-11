import "./Avatar.scss";
import propTypes from "prop-types";

function Avatar({ type, initials, pictureUrl }) {
  return (
    <div className={`avatar avatar-${type}`}>
      {pictureUrl ? <img src={pictureUrl} alt="Profil" /> : initials}
    </div>
  );
}
export default Avatar;

Avatar.propTypes = {
  type: propTypes.string,
  initials: propTypes.string,
  pictureUrl: propTypes.string,
};

Avatar.defaultProps = {
  type: null,
  initials: null,
  pictureUrl: null,
};

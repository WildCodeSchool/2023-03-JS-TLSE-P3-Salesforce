import "./Avatar.scss";
import propTypes from "prop-types";

function Avatar({ type, initials, pictureUrl, title }) {
  return (
    <div className={`avatar avatar-${type}`} title={title}>
      {pictureUrl ? <img src={pictureUrl} alt="Profil" /> : initials}
    </div>
  );
}
export default Avatar;

Avatar.propTypes = {
  type: propTypes.string,
  initials: propTypes.string,
  pictureUrl: propTypes.string,
  title: propTypes.string,
};

Avatar.defaultProps = {
  type: null,
  initials: null,
  pictureUrl: null,
  title: null,
};

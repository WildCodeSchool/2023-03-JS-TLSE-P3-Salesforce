import PropTypes from "prop-types";
import "./AvatarsList.scss";
import Avatar from "../Avatar/Avatar";

export default function AvatarsList({ avatars }) {
  return (
    <div className="avatars-list">
      {avatars.map((avatar) => (
        <Avatar key={avatar.id} />
      ))}
    </div>
  );
}

AvatarsList.propTypes = {
  avatars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};

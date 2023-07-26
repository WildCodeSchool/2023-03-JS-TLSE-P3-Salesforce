import PropTypes from "prop-types";
import "./AvatarsList.scss";
import Avatar from "../Avatar/Avatar";

export default function AvatarsList({ users }) {
  const allUsers = users;
  const usersToDisplay = allUsers.slice(0, 5);

  return (
    <div className="avatars-list">
      {usersToDisplay.map((user) => (
        <Avatar
          key={user.id}
          type="avatar-list"
          pictureUrl={user.picture_url ? user.picture_url : null}
          initials={
            !user.picture_url ? user.firstname[0] + user.lastname[0] : null
          }
          title={`${user.firstname} ${user.lastname.toUpperCase()}`}
        />
      ))}
      {allUsers.length > 5 && (
        <Avatar type="avatar-list-more" initials={`+${allUsers.length - 5}`} />
      )}
    </div>
  );
}

AvatarsList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      picture_url: PropTypes.string,
    })
  ).isRequired,
};

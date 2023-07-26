import { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./LikeButton.scss";
import AuthContext from "../../contexts/AuthContext";

export default function LikeButton({
  ideaId,
  likeActive,
  likeCount,
  setLikeCount,
  setLikeActive,
}) {
  const { userInfos, userToken } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    if (likeActive) {
      axios
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}/ideas/${ideaId}/likes/users/${
            userInfos.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then(() => {
          setLikeCount((prevCount) => prevCount - 1); // Utiliser la fonction de mise à jour précédente pour décrémenter le nombre de likes
          setLikeActive(0);
        })
        .catch((error) => {
          console.error("Error removing like:", error);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/ideas/${ideaId}/likes/users/${
            userInfos.id
          }`,
          null,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )

        .then(() => {
          setLikeCount((prevCount) => prevCount + 1); // Utiliser la fonction de mise à jour précédente pour incrémenter le nombre de likes
          setLikeActive(1);
        })
        .catch((error) => {
          console.error("Error adding like:", error);
        });
    }
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  let likeIcon = "fi fi-rr-heart";
  if (likeActive) {
    likeIcon = "fi fi-sr-heart";
    if (isHovered) {
      likeIcon = "fi fi-sr-heart-crack";
    }
  }

  return (
    <button
      className="idea-like"
      type="button"
      onClick={handleLike}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      {likeCount !== 0 && likeCount}
      <i className={likeIcon} />
    </button>
  );
}

LikeButton.propTypes = {
  ideaId: PropTypes.number.isRequired,
  likeActive: PropTypes.number.isRequired,
  likeCount: PropTypes.number,
  setLikeCount: PropTypes.func.isRequired,
  setLikeActive: PropTypes.func.isRequired,
};

LikeButton.defaultProps = {
  likeCount: 0,
};

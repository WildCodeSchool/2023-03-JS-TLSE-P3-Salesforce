import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./LikeButton.scss";

export default function LikeButton({
  ideaId,
  initialLikeActive,
  initialLikeCount,
}) {
  const [likeActive, setLikeActive] = useState(initialLikeActive);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    if (likeActive) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/ideas/${ideaId}/likes`)
        .then(() => {
          setLikeCount(likeCount - 1);
          setLikeActive(false);
        })
        .catch((error) => {
          console.error("Error removing like:", error);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/ideas/${ideaId}/likes`)
        .then(() => {
          setLikeCount(likeCount + 1);
          setLikeActive(true);
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
      {likeCount}
      <i className={likeIcon} />
    </button>
  );
}

LikeButton.propTypes = {
  ideaId: PropTypes.number.isRequired,
  initialLikeActive: PropTypes.bool.isRequired,
  initialLikeCount: PropTypes.number.isRequired,
};

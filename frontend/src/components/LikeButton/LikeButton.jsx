import { useState } from "react";
import PropTypes from "prop-types";
import "./LikeButton.scss";

export default function LikeButton({
  likeActive,
  setLikeActive,
  likeCount,
  setLikeCount,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const handleLike = () => {
    if (likeActive) {
      if (likeActive > 0) {
        setLikeCount(likeCount - 1);
      }
    } else {
      setLikeCount(likeCount + 1);
    }
    setLikeActive(!likeActive);
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
  likeActive: PropTypes.number.isRequired,
  setLikeActive: PropTypes.func.isRequired,
  likeCount: PropTypes.number.isRequired,
  setLikeCount: PropTypes.func.isRequired,
};

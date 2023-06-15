import React from "react";
import PropTypes from "prop-types";
import "./LikeButton.scss";

export default function LikeButton({
  likeActive,
  setLikeActive,
  likeCount,
  setLikeCount,
  isHovered,
  setIsHovered,
}) {
  const handleLike = () => {
    if (likeActive) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLikeActive(!likeActive);
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  let iconClassName = "fi fi-rr-heart";
  if (likeActive) {
    iconClassName = "fi fi-sr-heart";
    if (isHovered) {
      iconClassName = "fi fi-sr-heart-crack";
    }
  }

  return (
    <div>
      <button
        className="idea-like"
        type="button"
        onClick={handleLike}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <span className="idea-like-count">{likeCount} </span>
        <span className="idea-like-icon">
          <i className={iconClassName} />
        </span>
      </button>
    </div>
  );
}

LikeButton.propTypes = {
  likeActive: PropTypes.bool.isRequired,
  setLikeActive: PropTypes.func.isRequired,
  likeCount: PropTypes.number.isRequired,
  setLikeCount: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
  setIsHovered: PropTypes.func.isRequired,
};

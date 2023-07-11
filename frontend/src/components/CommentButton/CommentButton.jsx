import propTypes from "prop-types";
import "./CommentButton.scss";

export default function CommentButton({ commentCount }) {
  return (
    <button type="button" className="idea-comment">
      <span className="idea-comment-count">{commentCount} </span>
      <i className="fi fi-rr-comment-alt" />
    </button>
  );
}

CommentButton.propTypes = {
  commentCount: propTypes.number.isRequired,
};

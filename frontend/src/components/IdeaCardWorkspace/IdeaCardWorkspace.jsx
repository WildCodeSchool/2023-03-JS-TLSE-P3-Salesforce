/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState } from "react";
import propTypes from "prop-types";
import Draggable, { DraggableCore } from "react-draggable";

import LikeButton from "../LikeButton/LikeButton";
import SubmenuIdeaButton from "../SubmenuIdeaButton/SubmenuIdeaButton";
import CommentButton from "../CommentButton/CommentButton";
import "./IdeaCardWorkspace.scss";
import Badge from "../Badge/Badge";

export default function IdeaCardWorkspace({ idea }) {
  const [commentCount, setCommentCount] = useState(idea.comments_count);

  const [likeCount, setLikeCount] = useState(idea.likes_count);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [likeActive, setLikeActive] = useState(false);

  let splitIdeaCategories = [];

  if (idea.categories) {
    const nameAndColorCategories = idea.categories;
    splitIdeaCategories = nameAndColorCategories.split(",");
  }

  return (
    <Draggable
      bounds="parent"
      axis="both"
      // // handle=".handle"
      // defaultPosition={{ x: 0, y: 0 }}
      // // position={null}
      // grid={[25, 25]}
      // scale={1}
      // // onStart={this.handleStart}
      // // onDrag={this.handleDrag}
      // // onStop={this.handleStop}
    >
      <div className="idea-card">
        <div className="header-card">
          {/* ajout du titre en entete  */}
          <h2 className="title-idea">{idea.title}</h2>
          <SubmenuIdeaButton
            showSubmenu={showSubmenu}
            setShowSubmenu={setShowSubmenu}
          />
        </div>

        {/* on ajoute le descriptif de l'idée ainsi que les catégories  */}
        <div className="content-idea">
          {idea.categories && (
            <div className="badges-idea">
              {/* Afficher les composants de catégorie uniquement si une catégorie est sélectionnée */}
              {splitIdeaCategories.map((categories) => {
                const splitCategory = categories.split("|");
                return (
                  <Badge key={splitCategory[0]} color={splitCategory[1]}>
                    {splitCategory[0]}
                  </Badge>
                );
              })}
            </div>
          )}

          <p className="idea-description">{idea.description}</p>
        </div>
        <div className="footer-idea">
          <CommentButton
            commentCount={
              idea.comments_count === null ? 0 : idea.comments_count
            }
          />
          <LikeButton
            likeCount={likeCount}
            likeActive={idea.is_liked_by_user}
            setLikeCount={setLikeCount}
            setLikeActive={setLikeActive}
          />
        </div>
      </div>
    </Draggable>
  );
}

IdeaCardWorkspace.propTypes = {
  idea: propTypes.shape({
    title: propTypes.string.isRequired,
    description: propTypes.string,
    comments_count: propTypes.number,
    likes_count: propTypes.number,
    categories: propTypes.string,
    is_liked_by_user: propTypes.number,
  }),
};

IdeaCardWorkspace.defaultProps = {
  idea: {
    title: "",
    description: "",
    comments_count: 0,
    likes_count: 0,
    categories: "",
    is_liked_by_user: 0,
  },
};

/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState } from "react";
import propTypes from "prop-types";
import LikeButton from "../LikeButton/LikeButton";
import SubmenuIdeaButton from "../SubmenuIdeaButton/SubmenuIdeaButton";
import CommentButton from "../CommentButton/CommentButton";
import "./IdeaCard.scss";
import Badge from "../Badge/Badge";

export default function IdeaCard({ idea }) {
  const [commentCount, setCommentCount] = useState(idea.comments_count);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [likeCount, setLikeCount] = useState(idea.likes_count);
  const [likeActive, setLikeActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  let splitIdeaCategories = [];

  if (idea.categories) {
    const nameAndColorCategories = idea.categories;
    splitIdeaCategories = nameAndColorCategories.split(",");
  }

  return (
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
          commentCount={idea.comments_count === null ? 0 : idea.comments_count}
        />
        <LikeButton
          likeCount={idea.likes_count}
          likeActive={idea.is_liked_by_user}
          isHovered={isHovered}
          setLikeCount={setLikeCount}
          setLikeActive={setLikeActive}
          setIsHovered={setIsHovered}
        />
      </div>
    </div>
  );
}

IdeaCard.propTypes = {
  idea: propTypes.shape({
    title: propTypes.string.isRequired,
    description: propTypes.string,
    comments_count: propTypes.number,
    likes_count: propTypes.number,
    categories: propTypes.string,
    is_liked_by_user: propTypes.number,
  }),
};

IdeaCard.defaultProps = {
  idea: {
    title: "titre de l'idée",
    description: "description de l'idée",
    comments_count: 0,
    likes_count: 0,
    categories: "",
    is_liked_by_user: 0,
  },
};

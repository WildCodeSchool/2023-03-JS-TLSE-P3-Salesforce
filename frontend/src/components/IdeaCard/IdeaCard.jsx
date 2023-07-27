/* eslint-disable camelcase */
import React, { useState } from "react";
import PropTypes from "prop-types";
import LikeButton from "../LikeButton/LikeButton";
import SubmenuIdeaButton from "../SubmenuIdeaButton/SubmenuIdeaButton";
import "./IdeaCard.scss";
import Badge from "../Badge/Badge";

export default function IdeaCard({ idea }) {
  const [likeCount, setLikeCount] = useState(idea.likes_count);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [likeActive, setLikeActive] = useState(idea.is_liked_by_user);

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
        <button
          type="button"
          className="idea-menu-icon"
          onClick={() => setShowSubmenu(true)}
        >
          <i className="fi fi-rr-menu-dots-vertical" />
        </button>
        {showSubmenu && (
          <SubmenuIdeaButton setShowSubmenu={setShowSubmenu} ideaId={idea.id} />
        )}
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
        <LikeButton
          ideaId={idea.id}
          likeActive={likeActive}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
          setLikeActive={setLikeActive}
        />
      </div>
    </div>
  );
}

IdeaCard.propTypes = {
  idea: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    comments_count: PropTypes.number,
    likes_count: PropTypes.number,
    categories: PropTypes.string,
    is_liked_by_user: PropTypes.number,
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

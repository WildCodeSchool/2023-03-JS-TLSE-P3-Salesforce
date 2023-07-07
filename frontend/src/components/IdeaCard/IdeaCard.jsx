/* eslint-disable camelcase */
import React, { useState } from "react";
import LikeButton from "../LikeButton/LikeButton";
import SubmenuIdeaButton from "../SubmenuIdeaButton/SubmenuIdeaButton";
import CommentButton from "../CommentButton/CommentButton";
import "./IdeaCard.scss";
import Badge from "../Badge/Badge";

function IdeaCard() {
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  // il faudra remplacer "1" par une valeur dynamique "company_id"

  return (
    <div className="idea-card">
      <div className="header-card">
        {/* ajout du titre en entete  */}
        <h2 className="title-idea">XXXXX</h2>
        <SubmenuIdeaButton
          showSubmenu={showSubmenu}
          setShowSubmenu={setShowSubmenu}
        />
      </div>
      <div>
        {/* on ajoute le descriptif de l'idée ainsi que les catégories  */}
        <div className="content-idea">
          <div className="badges-idea">
            {/* Afficher les composants de catégorie uniquement si une catégorie est sélectionnée */}
            <Badge color="red">RH</Badge>
            <Badge color="green">Marketing</Badge>
            <Badge color="blue">Comptabilité</Badge>
          </div>

          <p className="idea-description">XXXXX</p>
        </div>
        <div className="footer-idea">
          <CommentButton
            commentCount={commentCount}
            showCommentModal={showCommentModal}
            setCommentCount={setCommentCount}
            setShowCommentModal={setShowCommentModal}
          />
          <LikeButton
            likeCount={likeCount}
            likeActive={likeActive}
            isHovered={isHovered}
            setLikeCount={setLikeCount}
            setLikeActive={setLikeActive}
            setIsHovered={setIsHovered}
          />
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;

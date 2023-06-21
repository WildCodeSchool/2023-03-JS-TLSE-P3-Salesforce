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

  return (
    <div className="idea-card-main">
      {/* creation de la carte de l'idée */}
      <div className="idea-card">
        <div className="header-card">
          {/* ajout du titre en entete  */}
          <h2 className="title-idea">Titre de l'idée</h2>
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
              <Badge color="green">
                <i className="dot" /> En cours{" "}
                <i className="fi fi-rr-cross-small" />
              </Badge>
              <Badge color="red">label</Badge>
              <Badge color="green">labeeel</Badge>
              <Badge color="blue">labeeeeel</Badge>
              <Badge color="yellow">labeeeeeeel</Badge>
              <Badge color="fuchsia">labeeeeeeeeel</Badge>
              <Badge color="red">coucou</Badge>
            </div>

            <p className="idea-description">
              Description de l'idée... <br />
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              ipsum corporis debitis et enim reiciendis velit quidem aperiam
              illo minima.
            </p>
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
    </div>
  );
}

export default IdeaCard;

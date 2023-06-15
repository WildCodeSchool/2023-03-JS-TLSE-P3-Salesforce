import React, { useState } from "react";
import "./CommentButton.scss";

export default function CommentButton() {
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");

  // on ouvre une modale pour ajouter un commentaire
  const openCommentModal = () => {
    setShowCommentModal(true);
  };

  // on  ajouter le commentaire, on met à jour le compteur de commentaires et on ferme la modale
  const handleComment = () => {
    setCommentText("");
    setShowCommentModal(false);
    if (commentText.trim() !== "") {
      setCommentCount(commentCount + 1);
    }
  };

  return (
    <div>
      {/* lorsqu'on clique sur l'icone du commentaire on fait apparaitre une modale pour commenter 
        et incrémenter le compteur commentaire */}

      <div>
        <button
          type="button"
          className="idea-comment-icon"
          onClick={openCommentModal}
        >
          <span className="idea-comment-count">{commentCount}</span>
          <i className="fi fi-rr-comment-alt" />
        </button>
      </div>

      {/* si la modale des commentaires est active, 
            on fait apparaitre le champs pour taper le commentaire avec les boutons ajouter et fermer */}
      {showCommentModal && (
        <div className="idea-modal-comment">
          {/* Contenu de la modale pour les commentaires */}
          <h3>Ajouter un commentaire</h3>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="button"
            className="idea-button-comment"
            onClick={handleComment}
          >
            Ajouter
          </button>
        </div>
      )}
    </div>
  );
}

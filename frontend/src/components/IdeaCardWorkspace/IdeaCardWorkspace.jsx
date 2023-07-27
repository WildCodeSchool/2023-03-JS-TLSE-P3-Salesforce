/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import Draggable from "react-draggable";
import LikeButton from "../LikeButton/LikeButton";

import SubmenuIdeaButton from "../SubmenuIdeaButton/SubmenuIdeaButton";

import "./IdeaCardWorkspace.scss";
import Badge from "../Badge/Badge";

export default function IdeaCardWorkspace({
  idea,
  setDataIdeasWorkspace,
  setIsModifiedIdeaModalOpen,
  setIsIdeaDeleted,
  setDataThisIdea,
  isModifiedIdeaModalOpen,
  setHigherZIndex,
  higherZIndex,
}) {
  const [likeCount, setLikeCount] = useState(idea.likes_count);
  const [likeActive, setLikeActive] = useState(idea.is_liked_by_user);
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    setShowSubmenu(false);
  }, [isModifiedIdeaModalOpen]);

  let ideaXCoordinate;
  if (idea.x_coordinate === null) {
    ideaXCoordinate = 0;
  } else {
    ideaXCoordinate = idea.x_coordinate;
  }

  let ideaYCoordinate;
  if (idea.y_coordinate === null) {
    ideaYCoordinate = 0;
  } else {
    ideaYCoordinate = idea.y_coordinate;
  }

  let splitIdeaCategories = [];
  const [position, setPosition] = useState({
    xcoordinate: ideaXCoordinate,
    ycoordinate: ideaYCoordinate,
  });

  const handleStop = (event, data) => {
    setPosition({
      xcoordinate: data.x,
      ycoordinate: data.y,
    });

    setDataIdeasWorkspace((prevData) =>
      prevData.map((ideaItem) => {
        if (ideaItem.id === idea.id) {
          return {
            ...ideaItem,
            x_coordinate: data.x,
            y_coordinate: data.y,
          };
        }
        return ideaItem;
      })
    );
  };
  const [currentZIndex, setCurrentZIndex] = useState(0);

  const handleStart = () => {
    setHigherZIndex((prevHigherZIndex) => prevHigherZIndex + 1);
    setCurrentZIndex(higherZIndex);
  };

  if (idea.categories) {
    const nameAndColorCategories = idea.categories;
    splitIdeaCategories = nameAndColorCategories.split(",");
  }
  // for position of the idea in the workspace

  return (
    <Draggable
      bounds="parent"
      axis="both"
      onStop={handleStop}
      position={{ x: position.xcoordinate, y: position.ycoordinate }}
      defaultPosition={{
        x: ideaXCoordinate,
        y: ideaYCoordinate,
      }}
      onStart={handleStart}
    >
      <div
        className="idea-card-workspace"
        style={{
          zIndex: currentZIndex,
        }}
      >
        <div className="header-card">
          <h2 className="title-idea">{idea.title}</h2>
          <button
            type="button"
            className="idea-menu-icon"
            onClick={() => {
              setDataThisIdea(idea);
              setShowSubmenu(true);
            }}
          >
            <i className="fi fi-rr-menu-dots-vertical" />
          </button>

          {showSubmenu && (
            <SubmenuIdeaButton
              setShowSubmenu={setShowSubmenu}
              setIsIdeaDeleted={setIsIdeaDeleted}
              setIsModifiedIdeaModalOpen={setIsModifiedIdeaModalOpen}
              ideaId={idea.id}
            />
          )}
        </div>
        <div className="content-idea">
          {idea.categories && (
            <div className="badges-idea">
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
    </Draggable>
  );
}

IdeaCardWorkspace.propTypes = {
  idea: propTypes.shape({
    title: propTypes.string.isRequired,
    description: propTypes.string,
    categories: propTypes.string,
    x_coordinate: propTypes.number,
    y_coordinate: propTypes.number,
    id: propTypes.number,
    likes_count: propTypes.number,
    is_liked_by_user: propTypes.number,
  }),

  setDataIdeasWorkspace: propTypes.func,
  setHigherZIndex: propTypes.func,
  higherZIndex: propTypes.number,
  setIsModifiedIdeaModalOpen: propTypes.func,
  setIsIdeaDeleted: propTypes.func,
  setDataThisIdea: propTypes.func,
  isModifiedIdeaModalOpen: propTypes.bool,
};

IdeaCardWorkspace.defaultProps = {
  idea: {
    title: "",
    description: "",
    categories: "",
    x_coordinate: 0,
    y_coordinate: 0,
    id: 0,
    likes_count: 0,
    is_liked_by_user: 0,
  },

  isModifiedIdeaModalOpen: false,
  setDataIdeasWorkspace: () => {},
  setHigherZIndex: () => {},
  higherZIndex: 0,
  setIsModifiedIdeaModalOpen: () => {},
  setIsIdeaDeleted: () => {},
  setDataThisIdea: () => {},
};

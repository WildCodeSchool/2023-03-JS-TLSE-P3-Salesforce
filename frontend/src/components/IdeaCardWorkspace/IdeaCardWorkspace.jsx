/* eslint-disable camelcase */
import React, { useState } from "react";
import propTypes from "prop-types";
import Draggable from "react-draggable";

import SubmenuIdeaButton from "../SubmenuIdeaButton/SubmenuIdeaButton";

import "./IdeaCardWorkspace.scss";
import Badge from "../Badge/Badge";

export default function IdeaCardWorkspace({ idea, setDataIdeasWorkspace }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

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

  if (idea.categories) {
    const nameAndColorCategories = idea.categories;
    splitIdeaCategories = nameAndColorCategories.split(",");
  }
  // for position of the idea in the workspace

  return (
    <Draggable
      bounds="parent"
      axis="both"
      // onDrag={handleDrag}
      onStop={handleStop}
      position={{ x: position.xcoordinate, y: position.ycoordinate }}
      defaultPosition={{
        x: ideaXCoordinate,
        y: ideaYCoordinate,
      }}
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
  }),

  setDataIdeasWorkspace: propTypes.func,
};

IdeaCardWorkspace.defaultProps = {
  idea: {
    title: "",
    description: "",
    categories: "",
    x_coordinate: 0,
    y_coordinate: 0,
    id: 0,
  },

  setDataIdeasWorkspace: () => {},
};

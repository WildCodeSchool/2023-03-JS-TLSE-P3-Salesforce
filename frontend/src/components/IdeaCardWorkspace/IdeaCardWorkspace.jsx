/* eslint-disable camelcase */
import React, { useState } from "react";
import propTypes from "prop-types";
import Draggable from "react-draggable";

import SubmenuIdeaButton from "../SubmenuIdeaButton/SubmenuIdeaButton";

import "./IdeaCardWorkspace.scss";
import Badge from "../Badge/Badge";

export default function IdeaCardWorkspace({ idea }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  let splitIdeaCategories = [];

  if (idea.categories) {
    const nameAndColorCategories = idea.categories;
    splitIdeaCategories = nameAndColorCategories.split(",");
  }

  return (
    <Draggable bounds="parent" axis="both">
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
  }),
};

IdeaCardWorkspace.defaultProps = {
  idea: {
    title: "",
    description: "",
    categories: "",
  },
};

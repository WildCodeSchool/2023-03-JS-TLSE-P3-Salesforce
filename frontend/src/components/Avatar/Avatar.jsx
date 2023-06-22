import React, { useState } from "react";
import image from "./portrait.jpg";
import "./Avatar.scss";

function Avatar() {
  // state

  // instructions
  function HandleMenu() {
    console.log("Hello");
    // route to page: mon compte
  }

  //render
  return (
    <div className="vignette">
      <img className="vignette-img" src={image} onClick={HandleMenu}></img>
    </div>
  );
}
export default Avatar;

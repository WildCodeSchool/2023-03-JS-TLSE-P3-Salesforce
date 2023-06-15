import "./BoardComponentNavBar.scss";

export default function BoardSubNavBar() {
  return (
    <div className="globalBoardComponentNavBar">
      <i className="fi fi-rr-apps" />
      <div className="textBoardComponentNavBar">
        <p className="titleBoardComponentNavBar">Refonde des extranets</p>
        <p className="subtitleBoardComponentNavBar">Pierre Dupont</p>
      </div>
      <div>
        <i className="fi fi-rr-menu-dots-vertical" />
      </div>
    </div>
  );
}

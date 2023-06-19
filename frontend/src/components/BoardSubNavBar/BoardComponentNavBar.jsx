import "./BoardComponentNavBar.scss";

export default function BoardSubNavBar() {
  return (
    <div className="global-board-component-nav-bar">
      <i className="fi fi-rr-apps" />
      <div className="text-board-component-nav-bar">
        <p className="title-board-component-nav-bar">Refonde des extranets</p>
        <p className="subtitle-board-component-nav-bar">Pierre Dupont</p>
      </div>
      <div>
        <i className="fi fi-rr-menu-dots-vertical" />
      </div>
    </div>
  );
}

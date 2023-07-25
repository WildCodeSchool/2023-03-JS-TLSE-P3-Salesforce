/* eslint-disable camelcase */
import { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import propTypes from "prop-types";
import AuthContext from "../../contexts/AuthContext";
import "./NewDeleteUsersByWorkspaceModal.scss";

export default function NewDeleteUsersByWorkspaceModal({
  setOpenAlertDelete,
  setDataIdeasWorkspace,
}) {
  const { userToken, userInfos } = useContext(AuthContext);
  const { workspace_id } = useParams();
  const deleteAllIdeasWorkspace = () => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/workspaces/${workspace_id}/ideas`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        if (res.affectedRows === 0) {
          console.error("les idées n'ont pas été supprimées");
        } else {
          setOpenAlertDelete(false);
          setDataIdeasWorkspace([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setOpenAlertDelete(false);
  };

  return (
    userToken &&
    Object.keys(userInfos).length && (
      <div className="modal new-detele-ideas-by-workspace-modal">
        <div className="filter" onClick={closeModal} aria-hidden="true" />
        <div className="container">
          <div className="header">
            <div className="content">
              <h3>
                Êtes-vous sûr de vouloir supprimer définitivement toutes les
                idées de l'espace de travail ?
              </h3>
              <div className="buttons">
                <button type="button" className="icon" onClick={closeModal}>
                  Annuler
                </button>
                <button
                  type="button"
                  className="submit"
                  onClick={deleteAllIdeasWorkspace}
                >
                  <i className="fi fi-rr-trash" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

NewDeleteUsersByWorkspaceModal.propTypes = {
  setOpenAlertDelete: propTypes.func,
  setDataIdeasWorkspace: propTypes.func,
};

NewDeleteUsersByWorkspaceModal.defaultProps = {
  setOpenAlertDelete: () => {},
  setDataIdeasWorkspace: () => {},
};

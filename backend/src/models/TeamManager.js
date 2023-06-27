/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class TeamManager extends AbstractManager {
  constructor() {
    super({ table: "team" });
  }

  // récupérer toutes les équipes
  getAllTeams() {
    return this.database.query(
      `SELECT ${this.table}.name,${this.table}.is_private,${this.table}.picture_url,${this.table}.description,${this.table}.objective,${this.table}.status FROM ${this.table}`
    );
  }

  // récupérer une équipe
  getOneTeam() {
    return this.database.query(
      `SELECT ${this.table}.name,${this.table}.is_private,${this.table}.picture_url,${this.table}.description,${this.table}.objective,${this.table}.status
     FROM ${this.table} where id = ?`,
      [id]
    );
  }

  // récuperer l'ensemble des membres d'une équipe
  getUsersbyTeam() {
    return this.database.query(
      `SELECT u.id, u.firstname, u.lastname FROM user u RIGHT JOIN team_has_user thu ON thu.user_id = u.id WHERE thu.team_id = ?;`,
      [user_id]
    );
  }

  // récupérer toutes les teams d'un membre
  getTeamsByUser() {
    return this.database.query(
      `SELECT ${this.table}.name, ${this.table}.creation_date,${this.table}.is_private, ${this.table}.picture_url, ${this.table}.description, ${this.table}.objective,${this.table}.status FROM ${this.table} RIGHT JOIN team_has_user thu ON ${this.table}.id = thu.team_id WHERE thu.user_id = ?;`,
      [user_id]
    );
  }

  // créer une équipe

  postTeam() {
    return this.database.query(
      `INSERT INTO ${this.table} (name, is_private, picture_url, description, objective, status, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        // eslint-disable-next-line no-restricted-globals
        name,
        isPrivate,
        pictureUrl,
        description,
        objective,
        // eslint-disable-next-line no-restricted-globals
        status,
        user_Id,
      ]
    );
  }

  // ajouter des membres à une equipe
  postUserByTeam() {
    return this.database.query(
      `INSERT INTO team_has_user (user_id,team_id)
        VALUES (?, ?)`,
      [user_id, team_id]
    );
  }

  // modifier une equipe
  updateTeam() {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, is_private = ?,picture_url = ?, description = ?,objective = ?,status = ? WHERE id = ?`,
      [name, is_private, picture_url, description, objective, status, id]
    );
  }
  // supprimer une equipe

  deleteTeam() {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }

  // supprimer des membres d'une equipe
  deleteUserFromTeam() {
    return this.database.query(
      `DELETE FROM team_has_user WHERE user_id = ? AND team_id=?`,
      [user_id, team_id]
    );
  }
}

module.exports = TeamManager;

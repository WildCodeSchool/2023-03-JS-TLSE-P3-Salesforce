/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class TeamManager extends AbstractManager {
  constructor() {
    super({ table: "team" });
  }

  // récupérer toutes les équipes
  getAllTeams(company_id) {
    return this.database.query(
      `SELECT ${this.table}.id,${this.table}.name,${this.table}.is_private,${this.table}.picture_url,${this.table}.description,${this.table}.objective,${this.table}.status FROM ${this.table}
      JOIN company ON company.id=${this.table}.company_id 
      WHERE ${this.table}.company_id=? `,
      [company_id]
    );
  }

  // récupérer une équipe
  getOneTeam(team_id, company_id) {
    return this.database.query(
      `SELECT ${this.table}.name,${this.table}.is_private,${this.table}.picture_url,${this.table}.description,${this.table}.objective,${this.table}.status
     FROM ${this.table}
     JOIN company ON company.id=${this.table}.company_id 
      where ${this.table}.id = ? AND company.id= ?`,
      [team_id, company_id]
    );
  }

  // récuperer l'ensemble des membres d'une équipe
  getUsersByTeamId(team_id) {
    return this.database.query(
      `SELECT u.id, u.firstname, u.lastname, u.picture_url, u.email, thu.joining_date
       FROM user u
       JOIN team_has_user thu ON u.id = thu.user_id
       WHERE thu.team_id = ?`,
      [team_id]
    );
  }

  // récupérer toutes les teams d'un membre
  getTeamsByUserId(user_id) {
    return this.database.query(
      `SELECT ${this.table}.name,${this.table}.is_private, ${this.table}.picture_url, ${this.table}.description, ${this.table}.objective,${this.table}.status,thu.joining_date
       FROM ${this.table} 
       JOIN team_has_user thu ON ${this.table}.id = thu.team_id
       WHERE thu.user_id = ?`,
      [user_id]
    );
  }

  // créer une équipe

  postTeam(
    name,
    is_private,
    picture_url,
    description,
    objective,
    status,
    user_id,
    company_id
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, is_private, picture_url, description, objective, status, user_id, company_id)
         VALUES (?,?, ?, ?, ?, ?, ?, ?);`,
      [
        name,
        is_private,
        picture_url,
        description,
        objective,
        status,
        user_id,
        company_id,
      ]
    );
  }

  // ajouter des membres à une equipe
  addUserByTeam(user_id, team_id) {
    return this.database.query(
      `INSERT INTO team_has_user (user_id,team_id)
        VALUES (?, ?)`,
      [user_id, team_id]
    );
  }

  // modifier une equipe
  updateTeam(
    name,
    is_private,
    picture_url,
    description,
    objective,
    status,
    id
  ) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, is_private = ?,picture_url = ?, description = ?,objective = ?, status = ? WHERE id = ?`,
      [name, is_private, picture_url, description, objective, status, id]
    );
  }
  // supprimer une equipe

  deleteTeam(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }

  // supprimer des membres d'une equipe
  deleteUserFromTeam(user_id, team_id) {
    return this.database.query(
      `DELETE FROM team_has_user WHERE user_id = ? AND team_id=?`,
      [user_id, team_id]
    );
  }
}

module.exports = TeamManager;

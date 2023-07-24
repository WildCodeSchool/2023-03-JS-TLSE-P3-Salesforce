/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class TeamManager extends AbstractManager {
  constructor() {
    super({ table: "team" });
  }

  // récupérer toutes les équipes
  getAllTeams(companyId) {
    return this.database.query(
      `SELECT ${this.table}.id,${this.table}.name,${this.table}.is_private,${this.table}.picture_url,${this.table}.description,${this.table}.objective,${this.table}.status FROM ${this.table}
      JOIN company ON company.id=${this.table}.company_id 
      WHERE ${this.table}.company_id=? `,
      [companyId]
    );
  }

  // récupérer une équipe
  getOneTeam(teamId, companyId) {
    return this.database.query(
      `SELECT ${this.table}.name,${this.table}.is_private,${this.table}.picture_url,${this.table}.description,${this.table}.objective,${this.table}.status
     FROM ${this.table}
     JOIN company ON company.id=${this.table}.company_id 
      where ${this.table}.id = ? AND company.id= ?`,
      [teamId, companyId]
    );
  }

  // récuperer l'ensemble des membres d'une équipe
  getUsersByTeamId(teamId) {
    return this.database.query(
      `SELECT u.id, u.firstname, u.lastname, u.picture_url, u.email, thu.joining_date
       FROM user u
       JOIN team_has_user thu ON u.id = thu.user_id
       WHERE thu.team_id = ?`,
      [teamId]
    );
  }

  // récupérer toutes les teams d'un membre
  getTeamsByUserId(userId) {
    return this.database.query(
      `SELECT ${this.table}.id,
       ${this.table}.name,
       ${this.table}.is_private,
        ${this.table}.picture_url,
         ${this.table}.description,
          ${this.table}.objective,
          ${this.table}.status,
          thu.joining_date
       FROM ${this.table} 
       JOIN team_has_user thu ON ${this.table}.id = thu.team_id
       WHERE thu.user_id = ?`,
      [userId]
    );
  }

  // créer une équipe

  addTeam(team, userId, companyId) {
    const { name, is_private, picture_url, description, objective, status } =
      team;

    return this.database.query(
      `INSERT INTO ${this.table} (name, is_private, picture_url, description, objective, status, user_id, company_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        name,
        is_private,
        picture_url,
        description,
        objective,
        status,
        userId,
        companyId,
      ]
    );
  }

  // ajouter des membres à une equipe
  addUserByTeam(userId, teamId) {
    return this.database.query(
      `INSERT INTO team_has_user (user_id,team_id)
        VALUES (?, ?)`,
      [userId, teamId]
    );
  }

  // modifier une equipe
  modifyTeamProfile(teamId, team) {
    const keys = Object.keys(team);
    const values = Object.values(team);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");

    return this.database.query(
      `UPDATE ${this.table} SET ${valueQuery} WHERE id = ?;`,
      [...values, teamId]
    );
  }
  // supprimer une equipe , route = ok

  deleteTeam(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }

  // supprimer des membres d'une equipe
  deleteUser(userId, teamId) {
    return this.database.query(
      `DELETE FROM team_has_user WHERE user_id = ? AND team_id = ?`,
      [userId, teamId]
    );
  }
}

module.exports = TeamManager;

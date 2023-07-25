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
  getTeamsByUserId(userId, companyId) {
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
       WHERE thu.user_id = ? AND ${this.table}.company_id = ? AND ${this.table}.status = "active"`,
      [userId, companyId]
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

  findTeamIdeas(teamId, userId) {
    return this.database.query(
      `SELECT
      i.id,
      i.creation_date,
      i.title,
      i.description,
      i.status,
      i.x_coordinate,
      i.y_coordinate,
      i.color_id,
      i.is_in_board,
      i.ideas_group_id,
      u.firstname AS creator_firstname,
      u.lastname AS creator_lastname,
      u.email AS creator_email,
      u.picture_url AS creator_picture_url,
      likes.likes_count AS likes_count,
      COUNT(DISTINCT comment.id) AS comments_count,
      GROUP_CONCAT(DISTINCT cat.name, "|", col.name) AS categories,
      CASE WHEN liked_by_user.idea_id IS NOT NULL THEN true ELSE false END AS is_liked_by_user
    FROM
      idea i
      LEFT JOIN user u ON u.id = i.user_id
      LEFT JOIN (
        SELECT idea_id, COUNT(*) AS likes_count
        FROM liked
        GROUP BY idea_id
      ) likes ON likes.idea_id = i.id
      LEFT JOIN liked liked_by_user ON liked_by_user.idea_id = i.id AND liked_by_user.user_id = ?
      LEFT JOIN comment ON comment.idea_id = i.id
      LEFT JOIN category_has_idea chi ON chi.idea_id = i.id
      LEFT JOIN category cat ON cat.id = chi.category_id
      LEFT JOIN color col ON col.id = cat.color_id
    WHERE
      i.team_id = ?
    GROUP BY
      i.id
    ORDER BY
      i.id DESC;`,
      [userId, teamId]
    );
  }
}

module.exports = TeamManager;

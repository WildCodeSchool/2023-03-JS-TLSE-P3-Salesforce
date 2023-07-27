const AbstractManager = require("./AbstractManager");

class WorkspaceManager extends AbstractManager {
  constructor() {
    super({ table: "workspace" });
  }

  checkIfUserIsInWorkspace(userId, workspaceId) {
    return this.database.query(
      `SELECT * FROM workspace_has_user WHERE user_id = ? AND workspace_id = ?;`,
      [userId, workspaceId]
    );
  }

  findWorkspacesByTeamId(
    teamId,
    isInWorkspace,
    isSalesForceAdmin,
    isCompanyAdmin
  ) {
    switch (
      isInWorkspace === true ||
      isSalesForceAdmin === true ||
      isCompanyAdmin === true
    ) {
      case true:
        return this.database.query(
          `SELECT
            ${this.table}.id,
            ${this.table}.name,
            ${this.table}.creation_date,
            ${this.table}.description,
            ${this.table}.is_private,
            COUNT(DISTINCT idea.id) AS total_ideas,
            COUNT(DISTINCT workspace_has_user.user_id) AS total_users
          FROM
            ${this.table}
            INNER JOIN idea ON ${this.table}.id = idea.workspace_id
            INNER JOIN workspace_has_user ON ${this.table}.id = workspace_has_user.workspace_id
          WHERE
            ${this.table}.team_id = ?
          GROUP BY
            ${this.table}.id,
            workspace_has_user.workspace_id;`,
          [teamId]
        );

      default:
        return this.database.query(
          `SELECT
            ${this.table}.id,
            ${this.table}.name,
            ${this.table}.creation_date,
            ${this.table}.description,
            ${this.table}.is_private,
            COUNT(idea.id) AS total_ideas,
            COUNT(DISTINCT workspace_has_user.user_id) AS total_users
          FROM
            ${this.table}
            INNER JOIN idea ON ${this.table}.id = idea.workspace_id
            INNER JOIN workspace_has_user ON ${this.table}.id = workspace_has_user.workspace_id
          WHERE
            ${this.table}.team_id = ? AND ${this.table}.is_private = 0 
          GROUP BY
            ${this.table}.id,
            workspace_has_user.workspace_id;`,
          [teamId]
        );
    }
  }

  findTeamByWorkspace(workspaceId) {
    return this.database.query(
      `SELECT *
      FROM ${this.table} WHERE ${this.table}.id = ?;`,
      [workspaceId]
    );
  }

  findUserWorkspacesByUserAndCompanyId(userId, companyId) {
    return this.database.query(
      `
      SELECT
      ${this.table}.id,
      ${this.table}.name,
      ${this.table}.creation_date,
      ${this.table}.description,
      ${this.table}.is_private,
      u.firstname AS creator_firstname,
      u.lastname AS creator_lastname,
      u.id AS user_id,
      t.id AS team_id,
      t.name AS team_name,
      (
        SELECT COUNT(DISTINCT idea.id)
        FROM idea
        WHERE idea.workspace_id = ${this.table}.id
      ) AS total_ideas,
      (
        SELECT COUNT(DISTINCT workspace_has_user.user_id)
        FROM workspace_has_user
        WHERE workspace_has_user.workspace_id = ${this.table}.id
      ) AS total_users
      FROM ${this.table}
      LEFT JOIN user AS u ON ${this.table}.user_id = u.id
      LEFT JOIN team AS t ON ${this.table}.team_id = t.id
      LEFT JOIN workspace_has_user ON ${this.table}.id = workspace_has_user.workspace_id
      WHERE ${this.table}.company_id = ?
      AND workspace_has_user.user_id = ?
      GROUP BY ${this.table}.id;`,
      [companyId, userId]
    );
  }

  findWorkspacesUsersById(workspaceId) {
    return this.database.query(
      `SELECT u.id, u.firstname, u.lastname, u.email, u.picture_url, w.id as workspace_id, w.team_id, w.name, w.creation_date, t.name as team_name
      FROM user u INNER JOIN workspace_has_user whu ON u.id = whu.user_id
      LEFT JOIN ${this.table} w ON w.id = whu.workspace_id
      LEFT JOIN team t ON t.id = w.team_id
      WHERE whu.workspace_id = ? ;`,
      [workspaceId]
    );
  }

  findWorkspaceIdeas(workspaceId, userId) {
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
      i.workspace_id = ?
    GROUP BY
      i.id
    ORDER BY
      i.id DESC;`,
      [userId, workspaceId]
    );
  }

  insertWorkspace(workspace, userId, companyId) {
    const { name, isPrivate, description, teamId } = workspace;

    return this.database.query(
      `INSERT INTO ${this.table} (name, is_private, description, team_id,user_id, company_id) VALUES ( ?, ?, ?, ?, ?, ?);`,
      [name, isPrivate, description, teamId, userId, companyId]
    );
  }

  insertUserInWorkspace(workspaceId, userId) {
    return this.database.query(
      `INSERT INTO workspace_has_user (workspace_id, user_id) VALUES (?, ?);`,
      [workspaceId, userId]
    );
  }

  updateWorkspaceById(workspaceId, workspace) {
    const keys = Object.keys(workspace);
    const values = Object.values(workspace);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");

    return this.database.query(
      `UPDATE ${this.table} SET ${valueQuery} WHERE id = ?;`,
      [...values, workspaceId]
    );
  }

  deleteWorkspaceById(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?;`, [id]);
  }

  removeWorkspaceUser(workspaceId, userId) {
    return this.database.query(
      `DELETE FROM workspace_has_user WHERE workspace_id = ? AND user_id = ?;`,
      [workspaceId, userId]
    );
  }
}

module.exports = WorkspaceManager;

const AbstractManager = require("./AbstractManager");

class WorkspaceManager extends AbstractManager {
  constructor() {
    super({ table: "workspace" });
  }

  getTeamWorkspaces(teamId, companyId) {
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
        ${this.table}.user_id = 2
        AND ${this.table}.company_id = 2
      GROUP BY
        ${this.table}.id,
        workspace_has_user.workspace_id;`,
      [teamId, companyId]
    );
  }

  getUserWorkspaces(userId, companyId) {
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
      ${this.table}.user_id = 2
      AND ${this.table}.company_id = 2
    GROUP BY
      ${this.table}.id,
      workspace_has_user.workspace_id;`,
      [userId, companyId]
    );
  }

  getWorkspacesUsers(workspaceId) {
    return this.database.query(
      `SELECT u.firstname, u.lastname, u.email, u.picture_url
        FROM user u INNER JOIN workspace_has_user whu ON u.id = whu.user_id
        WHERE whu.workspace_id = ?;`,
      [workspaceId]
    );
  }

  getWorkspaceIdeas(workspaceId) {
    return this.database.query(
      `SELECT
      i.id,
      i.creation_date,
      i.title,
      i.description,
      i.status,
      u.firstname,
      u.lastname,
      u.email,
      u.picture_url,
      i.x_coordinate,
      i.y_coordinate,
      i.color_id,
      i.is_in_board,
      i.ideas_group_id,
      COUNT(DISTINCT liked.idea_id) AS likes,
      COUNT(DISTINCT comment.id) AS comments,
      GROUP_CONCAT(DISTINCT cat.name, "|", col.name) AS categories
    FROM
      idea i
      LEFT JOIN user u ON u.id = i.user_id
      LEFT JOIN liked ON liked.idea_id = i.id
      LEFT JOIN comment ON comment.idea_id = i.id
      LEFT JOIN category_has_idea chi ON chi.idea_id = i.id
      LEFT JOIN category cat ON cat.id = chi.category_id
      LEFT JOIN color col ON col.id = cat.color_id
    WHERE
      workspace_id = ?
    GROUP BY
      i.id
    ORDER BY
      i.id DESC;`,
      [workspaceId]
    );
  }

  insertWorkspace(workspace) {
    const {
      name,
      isPrivate,
      pictureUrl,
      description,
      objective,
      status,
      userId,
      companyId,
    } = workspace;
    return this.database.query(
      `INSERT INTO ${this.table} (name, is_private, picture_url, description, objective, status, user_id, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        name,
        isPrivate,
        pictureUrl,
        description,
        objective,
        status,
        userId,
        companyId,
      ]
    );
  }

  updateWorkspaceById(workspace) {
    const {
      id,
      name,
      isPrivate,
      pictureUrl,
      description,
      objective,
      status,
      userId,
      companyId,
    } = workspace;
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, is_private = ?, picture_url = ?, description = ?, objective = ?, status = ?, user_id = ?, company_id = ? WHERE id = ?;`,
      [
        name,
        isPrivate,
        pictureUrl,
        description,
        objective,
        status,
        userId,
        companyId,
        id,
      ]
    );
  }

  deleteWorkspaceById(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?;`, [id]);
  }

  removeWorkspaceUsers(workspaceId, userId) {
    return this.database.query(
      `DELETE FROM workspace_has_user WHERE workspace_id = ? AND user_id = ?;`,
      [workspaceId, userId]
    );
  }
}

module.exports = WorkspaceManager;

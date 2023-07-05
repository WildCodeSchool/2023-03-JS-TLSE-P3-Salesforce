const AbstractManager = require("./AbstractManager");

class IdeaManager extends AbstractManager {
  constructor() {
    super({ table: "idea" });
  }

  insert(idea) {
    const {
      title,
      description,
      creationDate,
      parentId,
      userId,
      companyId,
      teamId,
      workspaceId,
      status,
      isInBoard,
      fileId,
    } = idea;
    return this.database.query(
      `insert into ${this.table} (title, description, creation_date, parent_id, user_id, company_id, team_id, workspace_id, status, is_in_board, file_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        title,
        description,
        creationDate,
        parentId,
        userId,
        companyId,
        teamId,
        workspaceId,
        status,
        isInBoard,
        fileId,
      ]
    );
  }

  findAllIdeasByUser(userId, companyId) {
    return this.database.query(
      `SELECT
        ${this.table}.id,
        ${this.table}.title, 
        ${this.table}.description, 
        ${this.table}.status, 
        ${this.table}.creation_date,
        u.firstname AS creator_firstname,
        u.lastname AS creator_lastname,
        u.email AS creator_email,
        u.picture_url AS creator_picture_url,
        comp.name AS company_name,
        COUNT(liked.id) AS likes_count,
        COUNT(c.id) AS comments_count,
        GROUP_CONCAT(DISTINCT cat.name, “|”, col.name) AS categories,
        CASE WHEN liked_by_user.idea_id IS NOT NULL THEN true ELSE false END AS is_liked_by_user
      FROM ${this.table}
      INNER JOIN user AS u ON u.id = ${this.table}.user_id
      LEFT JOIN company AS comp ON comp.id = ${this.table}.company_id
      LEFT JOIN liked ON liked.idea_id = ${this.table}.id
      LEFT JOIN comment ON comment.idea_id = ${this.table}.id
      LEFT JOIN comment AS c ON c.idea_id = ${this.table}.id
      LEFT JOIN user AS cu ON cu.id = c.user_id
      LEFT JOIN category_has_idea ON ${this.table}.id = category_has_idea.idea_id
      LEFT JOIN category AS cat ON cat.id = category_has_idea.category_id
      LEFT JOIN liked liked_by_user ON liked_by_user.idea_id = ${this.table}.id AND liked_by_user.user_id = ?
      WHERE u.id = ? AND comp.id = ?
      GROUP BY ${this.table}.id, comp.name,
      ORDER BY
      ${this.table}.id DESC;`,
      [userId, companyId]
    );
  }

  // celle qui permet de récupérer les idées d'une entreprise est la même que celle qui permet de récupérer les idées d'un user execpté que le where est focalisé sur l'id de l'entreprise
  getAllIdeasByCompany(companyId) {
    return this.database.query(
      `SELECT
        ${this.table}.id,
        ${this.table}.title, 
        ${this.table}.description, 
        ${this.table}.status, 
        ${this.table}.creation_date,
        u.firstname AS creator_firstname,
        u.lastname AS creator_lastname,
        u.email AS creator_email,
        u.picture_url AS creator_picture_url,
        comp.name AS company_name,
        COUNT(liked.id) AS likes_count,
        COUNT(c.id) AS comments_count,
        GROUP_CONCAT(DISTINCT cat.name, “|”, col.name) AS categories,
        CASE WHEN liked_by_user.idea_id IS NOT NULL THEN true ELSE false END AS is_liked_by_user
      FROM ${this.table}
      INNER JOIN user AS u ON u.id = ${this.table}.user_id
      LEFT JOIN company AS comp ON comp.id = ${this.table}.company_id
      LEFT JOIN liked ON liked.idea_id = ${this.table}.id
      LEFT JOIN comment ON comment.idea_id = ${this.table}.id
      LEFT JOIN comment AS c ON c.idea_id = ${this.table}.id
      LEFT JOIN user AS cu ON cu.id = c.user_id
      LEFT JOIN category_has_idea ON ${this.table}.id = category_has_idea.idea_id
      LEFT JOIN category AS cat ON cat.id = category_has_idea.category_id
      LEFT JOIN liked liked_by_user ON liked_by_user.idea_id = ${this.table}.id AND liked_by_user.user_id = ?
      WHERE comp.id = ?
      GROUP BY ${this.table}.id, comp.name,
      ORDER BY
      ${this.table}.id DESC;`,
      [companyId]
    );
  }

  update(idea) {
    const {
      id,
      title,
      description,
      status,
      isInBoard,
      xCoordinate,
      yCoordinate,
      ideaGroupId,
      colorId,
      fileId,
    } = idea;
    return this.database.query(
      `UPDATE ${this.table} SET 
        title = ? 
        description = ? 
        status = ? 
        is_in_board = ? 
        x_coordinate = ? 
        y_coordinate = ? 
        idea_group_id = ? 
        color_id = ? 
        file_id = ? 
      WHERE id = ?`,
      [
        id,
        title,
        description,
        status,
        isInBoard,
        xCoordinate,
        yCoordinate,
        ideaGroupId,
        colorId,
        fileId,
      ]
    );
  }
}

module.exports = IdeaManager;

/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class IdeaManager extends AbstractManager {
  constructor() {
    super({ table: "idea" });
  }

  insert(title, description, company_id, user_id, workspace_id) {
    return this.database.query(
      `insert into ${this.table} (title, description, company_id, user_id, workspace_id) values ( ?, ?, ?, ?, ?);`,
      [title, description, company_id, user_id, workspace_id]
    );
  }

  findAllIdeasByUser(userId) {
    return this.database.query(
      `SELECT
        ${this.table}.id,
        ${this.table}.title, 
        ${this.table}.description, 
        ${this.table}.status, 
        ${this.table}.creation_date,
        user.firstname AS creator_firstname,
        user.lastname AS creator_lastname,
        user.email AS creator_email,
        user.picture_url AS creator_picture_url,
        comp.name AS company_name,
        COUNT(liked.id) AS likes_count,
        comments.comments_count AS comments_count,
        GROUP_CONCAT(DISTINCT cat.name, "|", col.name) AS categories,
        CASE WHEN liked_by_user.idea_id IS NOT NULL THEN true ELSE false END AS is_liked_by_user
      FROM ${this.table}
      INNER JOIN user ON user.id = ${this.table}.user_id
      LEFT JOIN company AS comp ON comp.id = ${this.table}.company_id
      LEFT JOIN (
        SELECT idea_id, COUNT(*) AS comments_count
        FROM comment
        GROUP BY idea_id
      ) comments ON comments.idea_id = idea.id
      LEFT JOIN liked ON liked.idea_id = ${this.table}.id
      LEFT JOIN comment AS c ON c.idea_id = ${this.table}.id
      LEFT JOIN user AS cu ON cu.id = c.user_id
      LEFT JOIN category_has_idea ON ${this.table}.id = category_has_idea.idea_id
      LEFT JOIN category AS cat ON cat.id = category_has_idea.category_id
      LEFT JOIN liked liked_by_user ON liked_by_user.idea_id = ${this.table}.id AND liked_by_user.user_id = ?
      LEFT JOIN color col ON col.id = cat.color_id
      WHERE user.id = ?
      GROUP BY ${this.table}.id, comp.name
      ORDER BY
      ${this.table}.creation_date DESC;`,
      [userId, userId]
    );
  }

  // celle qui permet de récupérer les idées d'une entreprise est la même que celle qui permet de récupérer les idées d'un user excepté que le where est focalisé sur l'id de l'entreprise
  findAllIdeasByCompany(companyId, userId) {
    return this.database.query(
      ` SELECT
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
               likes.likes_count AS likes_count,
               comments.comments_count AS comments_count,
               GROUP_CONCAT(DISTINCT cat.name, "|", col.name) AS categories,
               CASE WHEN liked_by_user.idea_id IS NOT NULL THEN true ELSE false END AS is_liked_by_user
             FROM ${this.table}
             INNER JOIN company AS comp ON comp.id = ${this.table}.company_id
             LEFT JOIN user AS u ON u.id = ${this.table}.user_id
             LEFT JOIN (
               SELECT idea_id, COUNT(*) AS comments_count
               FROM comment
               GROUP BY idea_id
             ) comments ON comments.idea_id = ${this.table}.id
             LEFT JOIN (
              SELECT idea_id, COUNT(*) AS likes_count
              FROM liked
              GROUP BY idea_id
            ) likes ON likes.idea_id = ${this.table}.id
             LEFT JOIN comment AS c ON c.idea_id = ${this.table}.id
             LEFT JOIN user AS cu ON cu.id = c.user_id
             LEFT JOIN category_has_idea ON ${this.table}.id = category_has_idea.idea_id
             LEFT JOIN category AS cat ON cat.id = category_has_idea.category_id
             LEFT JOIN liked liked_by_user ON liked_by_user.idea_id = ${this.table}.id AND liked_by_user.user_id = ?
             LEFT JOIN color col ON col.id = cat.color_id
             WHERE comp.id = ? AND ${this.table}.workspace_id IS NULL
             GROUP BY ${this.table}.id, comp.name
             ORDER BY
             ${this.table}.id DESC;`,
      [userId, companyId]
    );
  }

  findAllIdeasByIdeasGroup(ideasgroupId, userId) {
    return this.database.query(
      ` SELECT
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
               comments.comments_count AS comments_count,
               GROUP_CONCAT(DISTINCT cat.name, "|", col.name) AS categories,
               CASE WHEN liked_by_user.idea_id IS NOT NULL THEN true ELSE false END AS is_liked_by_user
             FROM ${this.table}
             INNER JOIN ideas_group ON ideas_group.id = ${this.table}.ideas_group_id
             LEFT JOIN company AS comp ON comp.id = ${this.table}.company_id
             LEFT JOIN user AS u ON u.id = ${this.table}.user_id
             LEFT JOIN (
               SELECT idea_id, COUNT(*) AS comments_count
               FROM comment
               GROUP BY idea_id
             ) comments ON comments.idea_id = ${this.table}.id
             LEFT JOIN liked ON liked.idea_id = ${this.table}.id
             LEFT JOIN comment AS c ON c.idea_id = ${this.table}.id
             LEFT JOIN user AS cu ON cu.id = c.user_id
             LEFT JOIN category_has_idea ON ${this.table}.id = category_has_idea.idea_id
             LEFT JOIN category AS cat ON cat.id = category_has_idea.category_id
             LEFT JOIN liked liked_by_user ON liked_by_user.idea_id = ${this.table}.id AND liked_by_user.user_id = ?
             LEFT JOIN color col ON col.id = cat.color_id
             WHERE ideas_group_id = ?
             GROUP BY ${this.table}.id, comp.name
             ORDER BY
             ${this.table}.id DESC;`,
      [userId, ideasgroupId]
    );
  }

  update(idea, ideaId) {
    const { title, description } = idea;
    return this.database.query(
      `UPDATE ${this.table} SET 
        title = ?, 
        description = ?
      WHERE ${this.table}.id = ?`,
      [title, description, ideaId]
    );
  }

  updateCoordinatesIdea(idea) {
    const { x_coordinate, y_coordinate, id } = idea;
    return this.database.query(
      `UPDATE ${this.table} 
    SET
      x_coordinate = ?,
      y_coordinate = ?
    WHERE ${this.table}.id = ?`,
      [x_coordinate, y_coordinate, id]
    );
  }

  deleteAllIdeasWorkspace(workspace_id) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE workspace_id = ?`,
      [workspace_id]
    );
  }
}

module.exports = IdeaManager;

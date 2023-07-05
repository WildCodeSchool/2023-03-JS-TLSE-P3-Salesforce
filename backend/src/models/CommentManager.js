const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  postComment(comment, companyId, userId, ideaId) {
    const { content } = comment;
    return this.database.query(
      `INSERT INTO ${this.table} (content, company_id, user_id, idea_id) VALUES (?, ?, ?, ?)`,
      [content, companyId, userId, ideaId]
    );
  }

  findAllCommentsByIdea(comment) {
    const { ideaId } = comment;
    return this.database.query(
      `SELECT ${this.table}.content, user.firstname, user.lastname FROM ${this.table} INNER JOIN user ON user.id = ${this.table}.user_id WHERE idea_id = ?`,
      [ideaId]
    );
  }

  findAllCommentsByUser(comment) {
    const { userId } = comment;
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  findAllCountComments() {
    return this.database.query(`SELECT COUNT(id) FROM ${this.table}`);
  }

  delete(comment) {
    const { id } = comment;
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}
module.exports = CommentManager;

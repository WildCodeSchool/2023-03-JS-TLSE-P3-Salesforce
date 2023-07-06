const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  postComment(comment, ideaId, userId) {
    const { content } = comment;
    return this.database.query(
      `INSERT INTO ${this.table} (content, idea_id, user_id ) VALUES (?, ?, ?)`,
      [content, ideaId, userId]
    );
  }

  findAllCommentsByIdea(ideaId) {
    return this.database.query(
      `SELECT ${this.table}.content, user.firstname, user.lastname FROM ${this.table} INNER JOIN user ON user.id = ${this.table}.user_id WHERE idea_id = ?`,
      [ideaId]
    );
  }

  findAllCommentsByUser(userId) {
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  findAllCountComments() {
    return this.database.query(`SELECT COUNT(id) FROM ${this.table}`);
  }

  delete(commentId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
      [commentId]
    );
  }
}
module.exports = CommentManager;

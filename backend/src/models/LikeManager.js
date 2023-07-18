const AbstractManager = require("./AbstractManager");

class LikeManager extends AbstractManager {
  constructor() {
    super({ table: "liked" });
  }

  postLike(ideaId, userId) {
    return this.database.query(
      `insert into ${this.table} (idea_id, user_id) values (?, ?)`,
      [ideaId, userId]
    );
  }

  findAllLikesByIdea(ideaId) {
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE idea_id = ?`,
      [ideaId]
    );
  }

  findAllLikesByUser(userId) {
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  delete(ideaId, userId) {
    return this.database.query(
      `delete from ${this.table} where ${this.table}.idea_id = ? AND user_id = ?`,
      [ideaId, userId]
    );
  }
}
module.exports = LikeManager;

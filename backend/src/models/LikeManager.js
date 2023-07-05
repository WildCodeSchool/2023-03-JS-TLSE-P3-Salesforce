const AbstractManager = require("./AbstractManager");

class LikeManager extends AbstractManager {
  constructor() {
    super({ table: "liked" });
  }

  postLike(liked) {
    const { ideaId, userId } = liked;
    return this.database.query(
      `insert into ${this.table} (idea_id, user_id) values (?, ?)`,
      [ideaId, userId]
    );
  }

  findAllLikesByIdea(liked) {
    const { ideaId } = liked;
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE idea_id = ?`,
      [ideaId]
    );
  }

  findAllLikesByUser(liked) {
    const { userId } = liked;
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  delete(liked) {
    const { ideaId, userId } = liked;
    return this.database.query(
      `delete from ${this.table} where idea_id = ? and user_id = ?`,
      [ideaId, userId]
    );
  }
}
module.exports = LikeManager;

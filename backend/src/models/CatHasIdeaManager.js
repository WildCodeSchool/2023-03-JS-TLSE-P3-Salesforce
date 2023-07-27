/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class CatHasIdeaManager extends AbstractManager {
  constructor() {
    super({ table: "category_has_idea" });
  }

  insert(category_id, idea_id) {
    return this.database.query(
      `insert into ${this.table} (category_id, idea_id ) values (?,?)`,
      [category_id, idea_id]
    );
  }

  destroycatHadIdeaByIdeaId(idea_id) {
    return this.database.query(`delete from ${this.table} where idea_id = ?`, [
      idea_id,
    ]);
  }
}
module.exports = CatHasIdeaManager;

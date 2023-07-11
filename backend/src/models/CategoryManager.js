const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  insert(name, colorId, companyId) {
    return this.database.query(
      `insert into ${this.table} (name, color_id, company_id ) values (?,?,?)`,
      [name, colorId, companyId]
    );
  }

  update(name, colorId, companyId, id) {
    return this.database.query(
      `update ${this.table} set name = ?, color_id = ?, company_id = ? where id = ?`,
      [name, colorId, companyId, id]
    );
  }
}

module.exports = CategoryManager;

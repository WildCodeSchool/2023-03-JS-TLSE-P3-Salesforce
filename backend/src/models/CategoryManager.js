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

  findByCompanyId(companyId) {
    return this.database.query(
      `SELECT ${this.table}.*, c.name AS color_name FROM ${this.table} JOIN color c ON c.id = ${this.table}.color_id WHERE company_id = ?`,
      [companyId]
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

/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  insert(company) {
    const { name, baseline, siret, type, sector, logo_url } = company;
    return this.database.query(
      `insert into ${this.table} (name, baseline, siret, type, sector, logo_url) values (?,?,?,?,?,?)`,
      [name, baseline, siret, type, sector, logo_url]
    );
  }

  update(company, companyId) {
    const keys = Object.keys(company);
    const values = Object.values(company);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");

    return this.database.query(
      `UPDATE ${this.table} SET ${valueQuery} WHERE id = ?;`,
      [...values, companyId]
    );
  }

  getCompanyBySlug(slug) {
    return this.database.query(
      `SELECT ${this.table}.id, ${this.table}.name, ${this.table}.baseline, ${this.table}.slug, ${this.table}.logo_url, color.name AS color_name FROM ${this.table} RIGHT JOIN color on ${this.table}.color_id = color.id WHERE ${this.table}.slug = ?`,
      [slug]
    );
  }
}

module.exports = CompanyManager;

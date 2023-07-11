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

  update(company, id) {
    const { name, baseline, siret, type, sector, logo_url } = company;
    return this.database.query(
      `update ${this.table} set name = ?, baseline = ?, siret = ?, type = ?, sector = ?, logo_url = ? where id = ?`,
      [name, baseline, siret, type, sector, logo_url, id]
    );
  }
}

module.exports = CompanyManager;

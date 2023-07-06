const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  insert(company) {
    // eslint-disable-next-line camelcase
    const { name, baseline, siret, type, sector, logo_url } = company;
    return this.database.query(
      `insert into ${this.table} (name, baseline, siret, type, sector, logo_url) values (?,?,?,?,?,?)`,
      // eslint-disable-next-line camelcase
      [name, baseline, siret, type, sector, logo_url]
    );
  }

  update(company, id) {
    // eslint-disable-next-line camelcase
    const { name, baseline, siret, type, sector, logo_url } = company;
    return this.database.query(
      `update ${this.table} set name = ?, baseline = ?, siret = ?, type = ?, sector = ?, logo_url = ? where id = ?`,
      // eslint-disable-next-line camelcase
      [name, baseline, siret, type, sector, logo_url, id]
    );
  }
}

module.exports = CompanyManager;

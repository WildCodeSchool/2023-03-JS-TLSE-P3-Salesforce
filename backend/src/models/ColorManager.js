const AbstractManager = require("./AbstractManager");

class ColorManager extends AbstractManager {
  constructor() {
    super({ table: "color" });
  }

  insert(colors) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      colors,
    ]);
  }

  update(name, id) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [name, id]
    );
  }
}

module.exports = ColorManager;

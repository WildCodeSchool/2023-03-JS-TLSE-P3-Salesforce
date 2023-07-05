/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getUserByMail(mail) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE mail = ?`, [
      mail,
    ]);
  }

  insert(user) {
    const {
      firstname,
      lastname,
      email,
      hashed_password,
      phone_number,
      picture_url,
      is_salesforce_admin,
    } = user;
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, password, phone_number, picture_url, is_salesforce_admin) values (?, ?, ?, ?, ?, ?, ?);`,
      [
        firstname,
        lastname,
        email,
        hashed_password,
        phone_number,
        picture_url,
        is_salesforce_admin,
      ]
    );
  }
}

module.exports = UserManager;

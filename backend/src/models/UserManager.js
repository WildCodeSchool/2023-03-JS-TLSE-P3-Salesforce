/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getUserByMail(email, companyId) {
    return this.database.query(
      `SELECT
      ${this.table}.*,
      (
        SELECT
          GROUP_CONCAT(DISTINCT uhc.company_id)
        FROM
          user_has_company AS uhc
        WHERE
          ${this.table}.id = uhc.user_id
      ) AS companies
    FROM
      user
      LEFT JOIN user_has_company AS uhc ON ${this.table}.id = uhc.user_id
    WHERE
      ${this.table}.email = ?
      AND (
        uhc.company_id = ?
        OR ${this.table}.is_salesforce_admin = 1
      ); `,
      [email, companyId]
    );
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

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

  // récupérer tous les utilisateurs
  getAllUsers(company_id) {
    return this.database.query(
      `SELECT ${this.table}.id,${this.table}.firstname,${this.table}.lastname,${this.table}.email,${this.table}.picture_url FROM ${this.table} JOIN user_has_company AS uhc ON uhc.user_id=${this.table}.id JOIN company AS c ON c.id=uhc.company_id WHERE c.id=?`,
      [company_id]
    );
  }

  // récupérer un utilisateur
  getOneUser(company_id, user_id) {
    return this.database.query(
      `SELECT ${this.table}.id, ${this.table}.firstname,${this.table}.lastname,${this.table}.email,${this.table}.picture_url FROM ${this.table} JOIN user_has_company AS uhc ON uhc.user_id=${this.table}.id JOIN company AS c ON c.id=uhc.company_id WHERE c.id=? AND ${this.table}.id =?`,
      [company_id, user_id]
    );
  }

  // ajouter un utilisateur à une entreprise
  addUser(userId, companyId) {
    return this.database.query(
      `INSERT INTO user_has_company (user_id, company_id) VALUES (?,?);`,
      [userId, companyId]
    );
  }

  modifyUserProfile(userId, user) {
    const keys = Object.keys(user);
    const values = Object.values(user);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");

    return this.database.query(
      `UPDATE ${this.table} SET ${valueQuery} WHERE id = ?;`,
      [...values, userId]
    );
  }

  // supprimer un utilisateur
  deleteUserProfile(userId, companyId) {
    return this.database.query(
      `DELETE FROM user_has_company WHERE user_id = ? AND company_id= ?`,
      [userId, companyId]
    );
  }
}

module.exports = UserManager;

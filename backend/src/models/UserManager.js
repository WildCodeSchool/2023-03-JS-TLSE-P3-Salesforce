/* eslint-disable no-undef */
/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // récupérer tous les utilisateurs
  getAllUsers(company_id) {
    return this.database.query(
      `SELECT ${this.table}.firstname,${this.table}.lastname,${this.table}.email,${this.table}.picture_url FROM ${this.table} JOIN user_has_company AS uhc ON uhc.user_id=${this.table}.id JOIN company AS c ON c.id=uhc.company_id WHERE c.id=?`,
      [company_id]
    );
  }

  // récupérer un utilisateur
  getOneUser(company_id, user_id) {
    return this.database.query(
      `SELECT ${this.table}.firstname,${this.table}.lastname,${this.table}.email,${this.table}.picture_url FROM ${this.table} JOIN user_has_company AS uhc ON uhc.user_id=${this.table}.id JOIN company AS c ON c.id=uhc.company_id WHERE c.id=? AND ${this.table}.id =?`,
      [company_id, user_id]
    );
  }

  // ajouter un utilisateur à une entreprise

  postUser(firstname, lastname, email, picture_url) {
    return this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname,email,picture_url)
        VALUES (?,?,?,'',?)`,
      [firstname, lastname, email, picture_url]
    );
  }

  // modifier un utilisateur
  updateUser(
    firstname,
    lastname,
    email,
    password,
    phone_number,
    picture_url,
    is_salesforce_admin,
    creation_date,
    color_id,
    has_accepted_invitation,
    id
  ) {
    return this.database.query(
      `UPDATE ${this.table} SET firstname=?, lastname=?, email=?, password=?, phone_number=?, picture_url=?,is_salesforce_admin=?, creation_date=?, color_id=?,has_accepted_invitation=? WHERE id = ? `,

      [
        firstname,
        lastname,
        email,
        password,
        phone_number,
        picture_url,
        is_salesforce_admin,
        creation_date,
        color_id,
        has_accepted_invitation,
        id,
      ]
    );
  }

  // supprimer un utilisateur
  deleteUser(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}
module.exports = UserManager;

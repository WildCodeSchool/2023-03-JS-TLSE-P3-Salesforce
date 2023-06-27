/* eslint-disable no-undef */
/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // récupérer tous les utilisateurs
  getAllUsers() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  // ajouter un utilisateur à une entreprise

  postUser() {
    return this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, password, phone_number, picture_url)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [firstname, lastname, email, password, phone_number, picture_url]
    );
  }

  // modifier un utilisateur
  updateUser() {
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
  deleteUser() {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}
module.exports = UserManager;

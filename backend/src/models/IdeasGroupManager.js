/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class IdeasGroupManager extends AbstractManager {
  constructor() {
    super({ table: "ideas_group" });
  }

  insert(ideasgroup, workspaceId) {
    const { name_group, x_coordinate, y_coordinate } = ideasgroup;
    return this.database.query(
      `insert into ${this.table} (name_group, x_coordinate, y_coordinate, workspace_id) values ( ?, ?, ?, ?);`,
      [name_group, x_coordinate, y_coordinate, workspaceId]
    );
  }

  findAllIdeasGroupByWorkspace(workspaceId) {
    return this.database.query(
      `select * from ${this.table} where workspace_id = ?;`,
      [workspaceId]
    );
  }

  update(ideasgroup, ideasGroupId) {
    const { name_group, x_coordinate, y_coordinate } = ideasgroup;
    return this.database.query(
      `update ${this.table} set name_group = ?, x_coordinate = ?, y_coordinate = ? where ${this.table}.id = ?;`,
      [name_group, x_coordinate, y_coordinate, ideasGroupId]
    );
  }

  delete(ideasGroupId) {
    return this.database.query(
      `delete from ${this.table} where ${this.table}.id = ?;`,
      [ideasGroupId]
    );
  }
}

module.exports = IdeasGroupManager;

require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

// TEAM

const TeamManager = require("./TeamManager");

models.team = new TeamManager();
models.team.setDatabase(pool);

// WORKSPACE
const WorkspaceManager = require("./WorkspaceManager");

models.workspace = new WorkspaceManager();
models.workspace.setDatabase(pool);

// USER
const UserManager = require("./UserManager");

models.user = new UserManager();
models.user.setDatabase(pool);

// IDEA
const IdeaManager = require("./IdeaManager");

models.idea = new IdeaManager();
models.idea.setDatabase(pool);

// LIKE
const LikeManager = require("./LikeManager");

models.like = new LikeManager();
models.like.setDatabase(pool);

// COMMENT
const CommentManager = require("./CommentManager");

models.comment = new CommentManager();
models.comment.setDatabase(pool);

// IDEAS GROUP
const IdeasGroupManager = require("./IdeasGroupManager");

models.ideasgroup = new IdeasGroupManager();
models.ideasgroup.setDatabase(pool);

// CATEGORY
const CategoryManager = require("./CategoryManager");

models.category = new CategoryManager();
models.category.setDatabase(pool);

// CATEGORY_HAS_IDEA
const CatHasIdeaManager = require("./CatHasIdeaManager");

models.category_has_idea = new CatHasIdeaManager();
models.category_has_idea.setDatabase(pool);

// COLOR
const ColorManager = require("./ColorManager");

models.color = new ColorManager();
models.color.setDatabase(pool);

// COMPANY
const CompanyManager = require("./CompanyManager");

models.company = new CompanyManager();
models.company.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);

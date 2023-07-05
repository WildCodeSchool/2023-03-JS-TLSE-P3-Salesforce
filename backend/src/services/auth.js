const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  if (req.body.password) {
    argon2
      .hash(req.body.password, hashingOptions)
      .then((hashedPassword) => {
        req.body.hashed_password = hashedPassword;
        delete req.body.password;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    next();
  }
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashed_password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });
        delete req.user.hashed_password;
        res.status(200).send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyCompanyAdminRole = (req, res, next) => {
  const isCompanyAdmin = req.get("is_company_admin");
  if (isCompanyAdmin) {
    next();
  } else {
    res.sendStatus(403).send("Forbidden");
  }
};
const verifySalesForceAdminRole = (req, res, next) => {
  const isAdmin = req.get("is_admin");
  if (isAdmin) {
    next();
  } else {
    res.sendStatus(403).send("Forbidden");
  }
};

const verifyCompanyAdminOrSalesForceAdminRole = (req, res, next) => {
  const isCompanyAdmin = req.get("is_company_admin");
  const isAdmin = req.get("is_admin");
  if (isAdmin || isCompanyAdmin) {
    next();
  } else {
    res.sendStatus(403).send("Forbidden");
  }
};

const checkId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const payload = req.payload.sub;
  if (id === payload) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyCompanyAdminRole,
  verifySalesForceAdminRole,
  verifyCompanyAdminOrSalesForceAdminRole,
  checkId,
};

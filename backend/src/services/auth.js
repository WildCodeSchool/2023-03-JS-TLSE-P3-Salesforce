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
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.id,
          user: req.user,
          role: {
            isAdmin: req.user.is_salesforce_admin,
            isCompanyAdmin: req.user.is_company_admin,
          },
          companies: req.user.companies,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });
        delete req.user.password;
        res.status(200).send({
          token,
          user: req.user,
          role: {
            isAdmin: req.user.is_salesforce_admin,
            isCompanyAdmin: req.user.is_company_admin,
          },
          companies: req.user.companies,
        });
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
    res.status(403).send("Forbidden");
  }
};
const verifySalesForceAdminRole = (req, res, next) => {
  const isAdmin = req.get("is_admin");
  if (isAdmin) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};

const verifyCompanyAdminOrSalesForceAdminRole = (req, res, next) => {
  const { isCompanyAdmin, isAdmin } = req.payload.role;
  if (isAdmin || isCompanyAdmin) {
    next();
  } else {
    res
      .status(403)
      .send("Forbidden you are not company admin or Salesforce admin");
  }
};

const testIfCompanyAdminOrSalesForceAdminRole = (req, res, next) => {
  const { isCompanyAdmin, isAdmin } = req.payload.role;
  if (isAdmin || isCompanyAdmin) {
    req.isAdmin = true;
    next();
  } else {
    req.isAdmin = false;
    next();
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

const randomPasswordGenerator = (req, res, next) => {
  function passwordGenerator(length = 20) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-";
    let generatedPassword = "";
    for (let i = 0; i < length; i += 1) {
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    return generatedPassword;
  }
  req.body.password = passwordGenerator(20);
  req.body.newTempPassword = req.body.password;
  next();
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyCompanyAdminRole,
  verifySalesForceAdminRole,
  verifyCompanyAdminOrSalesForceAdminRole,
  checkId,
  randomPasswordGenerator,
  testIfCompanyAdminOrSalesForceAdminRole,
};

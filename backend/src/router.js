const express = require("express");

const router = express.Router();
const itemControllers = require("./controllers/ItemControllers");
const companyControllers = require("./controllers/CompanyControllers");
const categoryControllers = require("./controllers/CategoryControllers");
const colorControllers = require("./controllers/ColorControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// consulter l'ensemble des companies
router.get("/companies", companyControllers.browse);
// consulter une company par id
router.get("/companies/:id", companyControllers.read);
// modifier une company par id
router.put("/companies/:id", companyControllers.edit);
// ajouter une company
router.post("/companies", companyControllers.add);
// supprimer une company par id
router.delete("/companies/:id", companyControllers.destroy);

// consulter l'ensemble des categories
router.get("/categories", categoryControllers.browse);
// consulter une category par id
router.get("/categories/:id", categoryControllers.read);
// modifier une category par id
router.put("/categories/:id", categoryControllers.edit);
// ajouter une category
router.post("/categories", categoryControllers.add);
// supprimer une category par id
router.delete("/categories/:id", categoryControllers.destroy);

// consulter l'ensemble des colors
router.get("/colors", colorControllers.browse);
// consulter une color par id
router.get("/colors/:id", colorControllers.read);
// modifier une color par id
router.put("/colors/:id", colorControllers.edit);
// ajouter une color
router.post("/colors", colorControllers.add);
// supprimer une color par id
router.delete("/colors/:id", colorControllers.destroy);

module.exports = router;

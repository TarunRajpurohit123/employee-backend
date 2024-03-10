const employeeController = require("../controllers/employeeController");
const { validator } = require("../middlewares/validation");
const router = require("express").Router();

router.post("/", validator, employeeController.addSingle);

module.exports = router;
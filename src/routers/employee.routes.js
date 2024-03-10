const employeeController = require("../controllers/employeeController");
const { validator } = require("../middlewares/validation");
const router = require("express").Router();

router.post("/", validator, employeeController.addSingle);
router.get("/:eid", employeeController.getOneEmployee);
router.get("/all", employeeController.getAllEmployee);

module.exports = router;
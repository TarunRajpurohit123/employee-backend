const employeeStatusController = require("../controllers/employeeStatus.controller");

const router = require("express").Router();

router.get("/", employeeStatusController.getAllStatus);
router.post("/", employeeStatusController.demo);

router.get("/:id", employeeStatusController.findById);

module.exports = router;
const router = require("express").Router();

router.use("/employe", require("./employee.routes"));

module.exports = router;
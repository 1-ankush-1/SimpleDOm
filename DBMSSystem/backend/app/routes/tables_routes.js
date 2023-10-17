const express = require("express");
const router = express.Router();
const tableController = require("../controller/tables_controller");

router.get("/", tableController.getAllTables);
router.post("/tablename", tableController.getTableByName);
router.post("/add", tableController.addTable);
router.delete("/delete/:id", tableController.deleteFieldInTable);
router.post("/insert-field", tableController.addFieldInTable);

module.exports = router;
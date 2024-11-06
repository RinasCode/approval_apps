const express = require("express");
const router = express.Router();
const approvalController = require("../controllers/approvalController");
const authMiddleware = require("../middleware/authMiddleware"); 

router.post("/", authMiddleware, approvalController.create);
router.get("/", authMiddleware, approvalController.findAll);
router.get("/:id", authMiddleware, approvalController.findById);
router.put("/:id", authMiddleware, approvalController.update);
router.delete("/:id", authMiddleware, approvalController.delete);

module.exports = router;

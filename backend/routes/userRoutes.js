const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { route } = require('./authRoutes');
const router = express.Router();

router.post('/register', authMiddleware, roleMiddleware('admin'), UserController.register);
router.post('/login', UserController.login);
router.get("/", UserController.getAllUsers); 
router.get("/:id", UserController.getUserById); 
router.put("/:id",authMiddleware, roleMiddleware('admin'), UserController.updateUser); 
router.delete("/:id", UserController.deleteUser); 

module.exports = router;

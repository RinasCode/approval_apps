'use strict';
const express = require('express');
const router = express.Router();
const budgetRequestController = require('../controllers/budgetRequestController'); 
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/', authMiddleware, upload.single('attachment'), budgetRequestController.create); 
router.put("/:id", authMiddleware, upload.single('attachment'),budgetRequestController.update);
router.get('/', authMiddleware, budgetRequestController.findAll); 
router.get('/:id', authMiddleware, budgetRequestController.findById); 
router.delete('/:id', authMiddleware, budgetRequestController.delete); 

module.exports = router;

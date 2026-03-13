const express = require('express');
const router = express.Router();
const { getTrainers, createTrainer, updateTrainer, deleteTrainer } = require('../controllers/trainerController');
const { authenticate } = require('../middleware/auth');

router.get('/', getTrainers);
router.post('/', authenticate, createTrainer);
router.put('/:id', authenticate, updateTrainer);
router.delete('/:id', authenticate, deleteTrainer);

module.exports = router;

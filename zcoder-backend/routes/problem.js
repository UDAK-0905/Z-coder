const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// Create a new problem
router.post('/', async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all problems
router.get('/', async (req, res) => {
  const problems = await Problem.find();
  res.json(problems);
});

module.exports = router;

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
  const problem = new Problem({ ...req.body, createdBy: req.user._id });
  await problem.save();
  res.status(201).json(problem);
});

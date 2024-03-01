const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const { getHistory, addToHistory, deleteHistory } = require('../controllers/history');
const { addHistoryValidator, deleteHistoryValidator } = require('../validators/history');

router.get("/", auth, getHistory);

router.post("/", auth, addHistoryValidator, addToHistory);

router.delete("/:id", auth, deleteHistoryValidator, deleteHistory);

module.exports = router;
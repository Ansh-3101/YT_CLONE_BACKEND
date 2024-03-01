const express = require('express');
const router = express.Router();

const {
    addWatchLater,
    getWatchLater,
    getWatchLaterByVideoId,
    deleteWatchLater,
    getWatchLaterById
} = require('../controllers/watchLater');

const { addWatchLaterValidator, deleteWatchLaterValidator } = require('../validators/watchLater');
const auth = require('../middlewares/auth');

router.get('/all', auth, getWatchLater);
router.get('/:id', auth, getWatchLaterById);
router.get('/video/:videoId', auth, getWatchLaterByVideoId);

router.post('/', auth, addWatchLaterValidator, addWatchLater);

router.delete('/:id', auth, deleteWatchLaterValidator, deleteWatchLater);

module.exports = router
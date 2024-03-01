const express = require('express');
const router = express.Router();

const {
    getAllSubscriptions,
    getSubById,
    getSubByChannelId,
    addSubscription,
    deleteSubscription } = require('../controllers/subscribe');

const { addSubValidator, deleteSubValidator } = require('../validators/subscribe');
const auth = require('../middlewares/auth');

router.get('/all', auth, getAllSubscriptions);
router.get('/:id', auth, getSubById);
router.get('/channel/:channelId', auth, getSubByChannelId);

router.post('/', auth, addSubValidator, addSubscription);

router.delete('/:id', auth, deleteSubValidator, deleteSubscription);



module.exports = router;
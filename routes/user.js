const express = require('express');
const router = express.Router();
const { signIn, signOut, getSelf, getStats } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { signInValidator } = require('../validators/user');


router.get("/", auth, getSelf);
router.get("/stats", auth, getStats);

router.post("/signin", signInValidator, signIn);
router.post("/signout", auth, signOut);



module.exports = router
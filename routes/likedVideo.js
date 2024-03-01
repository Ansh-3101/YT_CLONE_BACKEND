const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
    addLikedVideo,
    getLikedVideos,
    deleteLikedVideo,
    getLikedVideoById,
    getLikedVideoByVideoId
} = require('../controllers/likedVideo');
const { addLikeValidator, deleteLikeValidator } = require('../validators/likedVideo');



router.get("/", auth, getLikedVideos);
router.get("/:id", auth, getLikedVideoById);
router.get("/video/:videoId", auth, getLikedVideoByVideoId);

router.post("/", auth, addLikeValidator, addLikedVideo);
router.delete("/:id", auth, deleteLikeValidator, deleteLikedVideo);


module.exports = router;
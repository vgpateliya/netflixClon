const {
  addToLiked,
  getLiked,
  removeFromLiked,
} = require("../controllers/UserController");
const router = require("express").Router();

router.post("/add", addToLiked);
router.get("/liked/:email", getLiked);
router.put("/remove", removeFromLiked);

module.exports = router;

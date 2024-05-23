const router = require("express").Router();

const postRoutes = require("./api/index.js");
const getRoutes = require("./get.js");
const profileRoutes = require("./profile.js")

router.use("/", getRoutes);
router.use("/api", postRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
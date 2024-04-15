const router = require("express").Router();
const postRoutes = require("./post.js");

router.use("/api", postRoutes);

module.exports = router;
const router = require("express").Router();
const postRoutes = require("./post.js");

router.use("/", postRoutes);

module.exports = router;
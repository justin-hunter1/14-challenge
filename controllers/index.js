const router = require("express").Router();

const postRoutes = require("./api/index.js");
const getRoutes = require("./get.js");

router.use("/", getRoutes);
router.use("/api", postRoutes);

module.exports = router;
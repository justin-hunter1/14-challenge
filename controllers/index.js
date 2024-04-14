const router = require("express").Router();

const postRoutes = require("./api");
const getRoutes = require("./get");

router.use("/", getRoutes);
router.use("/api", postRoutes);


module.exports = router;
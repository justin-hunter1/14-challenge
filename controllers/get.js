const router = require("express").Router();
const { User, Blog } = require("../models");
const withAuth = require("../utils/auth");

router.get("/login", async (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/profile");
        return;
    }
    res.render("login");
});

router.get("/", async (req, res) => {
    try {
        const blogPost = await Blog.findAll({
            include: [],
        });
        const data = blogPost.map((blog) => blog.get({ plain: true }));
        res.render("homepage", {
            data,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err) {
        res.status(500)
           .json(err);
        console.log(err);
    }
});

module.exports = router;
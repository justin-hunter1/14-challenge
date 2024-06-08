const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Blog }]
        });

        // const user = userData.map((user) => user.get({ plain: true }));
        const user = userData.get({ plain: true });

        res.render("profile", {
            user,
            loggedIn: req.session.loggedIn
        });
    } 
    catch (err) {
        res.status(404)
           .json({message: "No account found"});
    }
});

router.get("/login", async (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});

router.get("/:id", async (req, res) => {
    try {
        const blogPost = await Blog.findOne({
            where: { id: req.params.id },
            attributes: [
                "id",
                "title",
                "created_at",
                "content"
              ],
            include: [{
                model: User,
                attributes: ["email"]
            }],
            include: [{
                model: Comment,
                attributes: ["comment"],
                include: {
                    model: User,
                    attributes: ["id"]
                }
            }]
        });

        const data = blogPost.get({ plain: true });

        res.render("post", {
            data,
            loggedIn: req.session.loggedIn
        });
    }

    catch (err) {
        res.status(404)
           .json({ message: "No blog found"});
    }
});

router.get("/", async (req, res) => {
    try {
        const blogPost = await Blog.findAll({
            attributes: [
                "id",
                "title",
                "created_at",
                "content"
            ],
            include: [                
                {
                    model: User,
                    attributes: ["email"]
                }
            ]
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

// router.get('/create/', withAuth, async (req, res) => {
//     try {
//         const blogPost = await Blog.findAll({
//             attributes: [
//                 "id",
//                 "title",
//                 "created_at",
//                 "content"
//             ],
//             include: [                
//                 {
//                     model: User,
//                     attributes: ["email"]
//                 }
//             ]
//         });
//         const data = blogPost.map(data => data.get({ plain: true }));
//         res.render('create', { data, loggedIn: true });
//     }
//     catch(err) {
//         res.status(500)
//            .json(err);
//         console.log(err);
//     };
// });

module.exports = router;
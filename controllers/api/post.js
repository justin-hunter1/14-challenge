const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");


router.post("/comments", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment, bid: req.body.id,
            uid: req.session.user_id
        });
        res.status(200)
           .json(newComment);
    }
    catch (err) {
        console.log(err);
        res.status(400)
           .json(err);
    }
});

router.post("/blog", withAuth, async (req, res) => {
    try {
        const newComment = await Blog.create({
            comment: req.body.comment, bid: req.body.id,
            uid: req.session.user_id
        });
        res.status(200)
           .json(newComment);
    }
    catch (err) {
        console.log(err);
        res.status(400)
           .json(err);
    }
});

router.post("/signin", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400)
               .json({ message: "Incorrect email or password" });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        if (!validPassword) {
            res.status(400)
               .json({ message: "Incorrect email or password" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200)
               .json({ user: userData, message: "Welcome!" });

        });
    } 
    catch (err) {
        console.log(err);
        res.status(400)
           .json(err);
    }
});

router.post("/signup", async (req, res) => {
console.log(req.body);
    try {
        User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.email = dbUserData.email;
                req.session.loggedIn = true;
          
                res.json(dbUserData);
            });
        });
    } 
    catch (err) {
        console.log(err);
        res.status(400)
           .json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200)
               .end();
        });
    }
    else {
        res.status(404)
           .end();
    }
});

module.exports = router;

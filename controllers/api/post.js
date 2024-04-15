const router = require("express").Router();
const { User, Blog } = require("../../models");
const bcrypt = require("bcrypt");


router.post("/login", async (req, res) => {
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

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204)
               .end();
        });
    } else {
        res.status(404)
           .end();
    }
});

module.exports = router;
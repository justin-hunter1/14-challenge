const router = require("express").Router();
const bcrypt = require("bcrypt");
const sequelize = require("../../config/connection");

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400)
               .json({ message: "Incorrect email or password" });
            return;
        }
        const passwordData = await Password.findOne({ where: { uid: userData.id } });
        if (!passwordData) {
            res.status(400)
               .json({ message: "Something went wrong"})
        }

        const validPassword = await bcrypt.compare(req.body.password, passwordData.password);
        if (!validPassword) {
            res.status(400)
               .json({ message: "Incorrect email or password" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

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


module.exports = router;
const router = require("express").Router();
const sequelize = require("../config/connection.js");
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth.js");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: { uid: req.session.user_id },
    attributes: [
      "id",
      "title",
      "content",
      "created_at"
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "bid", "uid", "created_at"],
        include: {
          model: User,
          attributes: ["email"]
        }
      },
      {
        model: User,
        attributes: ["email"]
      }
    ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render("profile", { posts, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500)
       .json(err);
  });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "title",
      "content",
      "created_at"
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "bid", "uid", "created_at"],
        include: {
          model: User,
          attributes: ["email"]
        }
      },
      {
        model: User,
        attributes: ["email"]
      }
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404)
         .json({ message: "No entry found" });
      return;
    }
  
    const post = dbPostData.get({ plain: true });

    res.render("edit-post", {
      post,
      loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500)
       .json(err);
  });
});

router.get("/create/", withAuth, (req, res) => {
  Post.findAll({
    where: { uid: req.session.user_id },
    attributes: [
      "id",
      "title",
      "content",
      "created_at"
    ],
    include: [
    {
      model: Comment,
      attributes: ["id", "comment", "bid", "uid", "created_at"],
      include: {
        model: User,
        attributes: ["email"]
      }
    },
    {
      model: User,
      attributes: ["email"]
    }
    ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render("create-post", { posts, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500)
       .json(err);
  });
});

module.exports = router;
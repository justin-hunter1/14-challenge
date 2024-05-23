
const User = require("./user.js");
const Blog = require("./blog.js");
const Comment = require("./comment.js");

User.hasMany(Blog, {foreignKey: "uid", onDelete: "CASCADE"});
Blog.belongsTo(User, {foreignKey: "uid"});

User.hasMany(Comment, {foreignKey: "uid", onDelete: "CASCADE"});
Comment.belongsTo(User, {foreignKey: "uid"});

Blog.hasMany(Comment, {foreignKey: "bid", onDelete: "CASCADE"});
Comment.belongsTo(Blog, {foreignKey: "bid"});

module.exports = { User, Blog, Comment };

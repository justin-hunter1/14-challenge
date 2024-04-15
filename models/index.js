// import models
const User = require("./user.js");
const Blog = require("./blog.js");

User.hasMany(Blog, {foreignKey: "uid", onDelete: "CASCADE"});
Blog.belongsTo(User, {foreignKey: "uid"});


module.exports = { User, Blog };

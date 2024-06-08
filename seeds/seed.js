const sequelize = require("../config/connection.js");
const { User, Blog, Comment } = require("../models");

const seedUsers = require("./user.json");
const seedBlogs = require("./blog.json");
const seedComments = require("./comment.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(seedUsers);

 
  for (let i = 0; i < seedBlogs.length; i++) {
    const { id: randomuid } = users[Math.floor(Math.random() * users.length)];
  
    const blogs = await Blog.create({
      title: JSON.stringify(seedBlogs[i].title.toString()),
      content: JSON.stringify(seedBlogs[i].content.toString()),
      uid: randomuid
    });
  };
 // for (let ii = 0; ii < seedComments.length; ii++) {
  //   const { id: randomuid } = users[Math.floor(Math.random() * users.length)];
  //   const { id: randombid } = users[Math.floor(Math.random() * blogs.length)];

  //   const comments = await Comment.create({
  //     comment: JSON.stringify(seedComments[ii].comment),
  //     bid: randombid,
  //     uid: randomuid
  //   });
  // };
  
  console.log("\n----- DATABASE SYNCED -----\n");
  
  process.exit(0);
}
seedAll();

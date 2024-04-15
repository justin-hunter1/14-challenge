const sequelize = require("../config/connection");
const { User, Blog } = require("../models/index");

const seedUsers = require("./user.json");
const seedBlogs = require("./blog.json")

const seedAll = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(seedUsers);

  console.log('---------------------------------------------');
  console.log(users);
  console.log('---------------------------------------------');

  for (let i = 0; i < seedBlogs.length; i++) {
    const { id: randomuid } = users[Math.floor(Math.random() * users.length)];
  
    const blogs = await Blog.create({
      title: JSON.stringify(seedBlogs[i].title),
      comment: JSON.stringify(seedBlogs[i].comment),
      uid: randomuid
    });
  }

  console.log("\n----- DATABASE SYNCED -----\n");
  
  // process.exit(0);
};

seedAll();

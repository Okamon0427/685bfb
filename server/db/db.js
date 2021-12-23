const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/messenger`,
  {
    logging: false,
  }
);

// Database Connection Test
async function connectionTest() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
connectionTest();

module.exports = db;

require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/messenger",
  {
    logging: false,
  }
);

// Database Connection Test
async function connectionTest() {
  try {
    await db.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
connectionTest();

module.exports = db;

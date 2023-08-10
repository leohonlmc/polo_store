const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

router.get("/", async (req, res, next) => {
  try {
    const connection = await oracledb.getConnection();
    const queryResult = await connection.execute(
      "SELECT USER_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, CREATED_DATE FROM COMM_USER"
    );
    const userData = queryResult.rows;

    await connection.close();

    // Pass the user data to the admin.ejs view
    res.render("admin", { title: "Admin", products: userData });
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

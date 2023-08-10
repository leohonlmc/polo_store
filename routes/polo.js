const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

router.get("/:id", async (req, res, next) => {
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      "SELECT product_id, product_name, product_price FROM COMM_PRODUCT WHERE product_id = " +
        req.params.id
    );
    const data = result.rows;
    await connection.close();

    console.log(data[0]);

    // Pass the product data to the index.ejs view
    res.render("polo", { title: "Polo Store", products: data });
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

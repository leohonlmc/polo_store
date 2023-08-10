const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

router.get("/", async (req, res, next) => {
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      "SELECT product_id, product_name, product_price FROM COMM_PRODUCT"
    );
    const data = result.rows;
    await connection.close();
    console.log(data);

    // Pass the product data to the index.ejs view
    res.render("index", { title: "Polo Store", products: data });
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).send("Internal Server Error");
  }
});

//increase retail price
router.post("/update", async (req, res, next) => {
  try {
    const connection = await oracledb.getConnection();

    // Execute the update_retail_price procedure from the package
    await connection.execute("BEGIN comm_user_pkg.update_retail_price; END;");

    // Commit the transaction (if needed)
    await connection.commit();

    await connection.close();

    // Redirect back to the index page to display the updated data
    console.log("Retail prices increased successfully!");

    res.redirect("/");
  } catch (error) {
    console.error("Error increasing retail prices:", error);

    return res.status(500).send("Internal Server Error");
  }
});

//lower retail price
router.post("/lower", async (req, res, next) => {
  try {
    const connection = await oracledb.getConnection();

    // Execute the lower_retail_price procedure from the package
    await connection.execute("BEGIN comm_user_pkg.lower_retail_price; END;");

    // Commit the transaction (if needed)
    await connection.commit();

    await connection.close();

    // Redirect back to the index page to display the updated data
    console.log("Retail prices decreased successfully!");

    res.redirect("/");
  } catch (error) {
    console.error("Error decreasing retail prices:", error);

    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

// //increase retail price
// router.post("/update", async (req, res, next) => {
//   try {
//     const connection = await oracledb.getConnection();

//     // Execute the update_retail_price procedure
//     await connection.execute("BEGIN update_retail_price; END;");

//     // Commit the transaction (if needed)
//     await connection.commit();

//     await connection.close();

//     // Redirect back to the index page to display the updated data
//     console.log("Retail prices updated successfully!");

//     res.redirect("/");
//   } catch (error) {
//     console.error("Error updating retail prices:", error);

//     return res.status(500).send("Internal Server Error");
//   }
// });

// //lower retail price
// router.post("/lower", async (req, res, next) => {
//   try {
//     const connection = await oracledb.getConnection();

//     // Execute the update_retail_price procedure
//     await connection.execute("BEGIN lower_retail_price; END;");

//     // Commit the transaction (if needed)
//     await connection.commit();

//     await connection.close();

//     // Redirect back to the index page to display the updated data
//     console.log("Retail prices updated successfully!");

//     res.redirect("/");
//   } catch (error) {
//     console.error("Error updating retail prices:", error);

//     return res.status(500).send("Internal Server Error");
//   }
// });

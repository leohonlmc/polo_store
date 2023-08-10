const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

router.get("/:id", async (req, res, next) => {
  try {
    const connection = await oracledb.getConnection();
    const userId = req.params.id;

    // PL/SQL block to call the function and extract individual fields
    const plsql = `
      DECLARE
        user_rec COMM_USER%ROWTYPE;
      BEGIN
        user_rec := get_user_info(:userId);
        
        :userId_out := user_rec.USER_ID;
        :firstName_out := user_rec.FIRST_NAME;
        :lastName_out := user_rec.LAST_NAME;
        :email_out := user_rec.EMAIL;
        :phoneNumber_out := user_rec.PHONE_NUMBER;
        :createdDate_out := user_rec.CREATED_DATE;
      END;
    `;

    const result = await connection.execute(plsql, {
      userId: userId,
      userId_out: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      firstName_out: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      lastName_out: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      email_out: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      phoneNumber_out: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      createdDate_out: { type: oracledb.DATE, dir: oracledb.BIND_OUT },
    });

    const userInfo = [
      [
        result.outBinds.userId_out,
        result.outBinds.firstName_out,
        result.outBinds.lastName_out,
        result.outBinds.email_out,
        result.outBinds.phoneNumber_out,
        result.outBinds.createdDate_out,
      ],
    ];

    // Pass the user data to the user_info.ejs view
    res.render("user_info", { title: "User Info", userInfo: userInfo });
  } catch (error) {
    console.error("Oracle Database Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

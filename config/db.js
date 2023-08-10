const oracledb = require("oracledb");

async function connectToDB() {
  try {
    await oracledb.createPool({
      user: "COMP214_M23_zo_5",
      password: "password",
      connectString: "oracle1.centennialcollege.ca:1521/SQLD",
      // connectString: "199.212.26.208:1521/SQLD",
    });
    console.log("Connected to Oracle Database");
  } catch (error) {
    console.error("Error connecting to Oracle Database:", error);
  }
}

module.exports = {
  connectToDB,
};

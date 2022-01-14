const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:Admin123@cnpm.6zsm4.mongodb.net/CNPM"
    );

    console.log("Connect Successfully");
  } catch (error) {
    console.log("Connect Failure");
  }
}

module.exports = { connect };

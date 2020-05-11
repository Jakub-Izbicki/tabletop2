const mongoose = require("mongoose");

const username = process.env.TABLETOP_MONGO_USER;
const password = process.env.TABLETOP_MONGO_PASSWORD;

const MONGOURI = `mongodb+srv://${username}:${password}@tabletop-1-dzqwz.mongodb.net/test?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("--- Connected to database ---");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;

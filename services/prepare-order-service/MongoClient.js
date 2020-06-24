const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const Client = mongoClient.connect();

module.exports = {
  Client,
};

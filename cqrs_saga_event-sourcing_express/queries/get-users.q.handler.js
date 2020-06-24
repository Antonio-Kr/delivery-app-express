const { Client } = require("../MongoClient");

exports.GetUsersHandler = class GetUsersHandler {
  async execute(query) {
    return new Promise(async (resolve, reject) => {
      const users = (await Client)
        .db("usersdb")
        .collection("users")
        .find({})
        .toArray();
      resolve(users);
    });
  }
};

const { Client } = require("../../MongoClient");
const { EVENT } = require("../event-types");

exports.PrepareOrderBeginEvent = class PrepareOrderBeginEvent {
  static async handle(event) {
    (await Client)
      .db("orders_events")
      .collection("events")
      .insertOne({ type: EVENT.commandBegin, event });
  }
};

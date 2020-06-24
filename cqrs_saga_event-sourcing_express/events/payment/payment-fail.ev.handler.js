const { Client } = require("../../MongoClient");
const { EVENT } = require("../event-types");

exports.PaymentFailEvent = class PaymentFailEvent {
  static async handle(event) {
    (await Client)
      .db("orders_events")
      .collection("events")
      .insertOne({ type: EVENT.commandFail, event });
  }
};

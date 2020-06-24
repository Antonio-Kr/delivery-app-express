const { Client } = require("../../MongoClient");
const { EVENT } = require("../event-types");

exports.PaymentBeginEvent = class PaymentBeginEvent {
  static async handle(event) {
    (await Client)
      .db("orders_events")
      .collection("events")
      .insertOne({ type: EVENT.commandBegin, event });
  }
};

const { Client } = require("../../MongoClient");
const { EVENT } = require("../event-types");

exports.PaymentDoneEvent = class PaymentDoneEvent {
  static async handle(event) {
    (await Client)
      .db("orders_events")
      .collection("events")
      .insertOne({ type: EVENT.commandDone, event });
  }
};

const { kafkaProducer } = require("../Kafka");
const {
  PaymentBeginEvent,
} = require("../events/payment/payment-begin.ev.handler");

exports.PaymentCommand = class PaymentCommand {
  async execute() {
    const payment = {
      transactionId: Date.now(),
      payment: "payment",
    };
    const payload = [
      {
        topic: "payments",
        messages: [JSON.stringify(payment)],
        partitions: 1,
      },
    ];
    kafkaProducer.send(payload, (err, data) => {
      PaymentBeginEvent.handle(payment);
    });
  }
};

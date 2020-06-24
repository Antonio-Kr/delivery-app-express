const { kafkaProducer } = require("../Kafka");
const {
  DeliveryBeginEvent,
} = require("../events/delivery/delivery-begin.ev.handler");

exports.DeliveryCommand = class DeliveryCommand {
  async execute(transactionId) {
    const delivery = {
      transactionId,
      delivery: "delivery",
    };
    const payload = [
      {
        topic: "deliveries",
        messages: [JSON.stringify(delivery)],
        partitions: 1,
      },
    ];
    kafkaProducer.send(payload, (err, data) => {
      DeliveryBeginEvent.handle(delivery);
    });
  }
};

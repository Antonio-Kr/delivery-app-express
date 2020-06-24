const { kafkaProducer } = require("../Kafka");
const {
  PrepareOrderBeginEvent,
} = require("../events/prepare-order/prepare-order-begin.ev.handler");

exports.PrepareOrderCommand = class PrepareOrderCommand {
  async execute(transactionId) {
    const prepareOrder = {
      transactionId,
      prepareOrder: "prepare order",
    };
    const payload = [
      {
        topic: "stocks",
        messages: [JSON.stringify(prepareOrder)],
        partitions: 1,
      },
    ];
    kafkaProducer.send(payload, (err, data) => {
      PrepareOrderBeginEvent.handle(prepareOrder);
    });
  }
};

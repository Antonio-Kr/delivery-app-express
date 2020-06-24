const kafka = require("kafka-node"),
  client = new kafka.KafkaClient(),
  Producer = kafka.Producer,
  Consumer = kafka.Consumer,
  kafkaProducer = new Producer(client),
  kafkaConsumer = new Consumer(
    client,
    [
      { topic: "payment-reply", partitions: 1 },
      { topic: "stock-reply", partitions: 1 },
      { topic: "delivery-reply", partitions: 1 },
    ],
    {
      autoCommit: true,
    }
  );

kafkaProducer.on("error", console.log);
kafkaConsumer.on("error", console.log);

module.exports = {
  kafkaProducer,
  kafkaConsumer,
};

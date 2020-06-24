const kafka = require("kafka-node"),
  client = new kafka.KafkaClient();

const topicsToCreate = [
  {
    topic: "payments",
    partitions: 1,
    replicationFactor: 1,
  },
  {
    topic: "stocks",
    partitions: 1,
    replicationFactor: 1,
  },
  {
    topic: "deliveries",
    partitions: 1,
    replicationFactor: 1,
  },
  {
    topic: "payment-reply",
    partitions: 1,
    replicationFactor: 1,
  },
  {
    topic: "stock-reply",
    partitions: 1,
    replicationFactor: 1,
  },
  {
    topic: "delivery-reply",
    partitions: 1,
    replicationFactor: 1,
  },
];

client.createTopics(topicsToCreate, (err, result) => {
  console.log("ERROR => " + err);
  console.log(result);
});

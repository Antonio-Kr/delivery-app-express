const kafka = require("kafka-node"),
  client = new kafka.KafkaClient(),
  Producer = kafka.Producer,
  Consumer = kafka.Consumer,
  consumer = new Consumer(client, [{ topic: "stocks", partitions: 1 }], {
    autoCommit: true,
  }),
  producer = new Producer(client),
  { Client } = require("./MongoClient");

consumer.on("message", async (msg) => {
  const data = JSON.parse(msg.value);
  await (await Client).db("ordersdb").collection("orders").insertOne(data);
  const reply = [
    {
      transactionId: data.transactionId,
      reply: "stock reply",
    },
  ];
  const payload = [
    {
      topic: "stock-reply",
      messages: [JSON.stringify(reply)],
      partitions: 1,
    },
  ];

  await producer.send(payload, (err, data) => {
    console.log(data);
  });
});

producer.on("error", console.log);
consumer.on("error", console.log);

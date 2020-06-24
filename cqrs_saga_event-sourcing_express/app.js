"use strict";

const express = require("express");
const app = express();

const { kafkaConsumer } = require("./Kafka");

// commands
const { PaymentCommand } = require("./commands/payment.co.handler");
const { PrepareOrderCommand } = require("./commands/prepare-oreder.co.handler");
const { DeliveryCommand } = require("./commands/delivery.co.handler");

// events
const {
  PaymentDoneEvent,
} = require("./events/payment/payment-done.ev.handler");
const {
  PrepareOrderDoneEvent,
} = require("./events/prepare-order/prepare-order-done.ev.handler");
const {
  DeliveryDoneEvent,
} = require("./events/delivery/delivery-done.ev.handler");

app.use(express.json());
app.use(express.urlencoded());

const paymentCo = new PaymentCommand();
const prepareOrderCo = new PrepareOrderCommand();
const deliveryCo = new DeliveryCommand();

// app.get("/", async (req, res) => {
//   const users = await getUsersH.execute().catch(console.log);
//   res.write(JSON.stringify(users));
//   res.end();
// });

app.post("/", async (req, res) => {
  paymentCo.execute().catch(console.log);
  kafkaConsumer.on("message", (msg) => {
    switch (msg.topic) {
      case "payment-reply": {
        const paymentResult = JSON.parse(msg.value);
        PaymentDoneEvent.handle(paymentResult);
        prepareOrderCo.execute(paymentResult.transactionId);
        break;
      }
      case "stock-reply": {
        const prepareOrderResult = JSON.parse(msg.value);
        PrepareOrderDoneEvent.handle(prepareOrderResult);
        deliveryCo.execute(prepareOrderResult.transactionId);
        break;
      }
      case "delivery-reply": {
        const deliveryResult = JSON.parse(msg.value);
        DeliveryDoneEvent.handle(deliveryResult);

        res.write("Delivery done");
        res.end();
        break;
      }

      default: {
        res.write("ERROR");
        res.end();
      }
    }
  });
});

app.listen(3000, () => console.log("listen"));

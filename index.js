const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleWare
app.use(cors());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS}@cluster0.ireya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("Doctors-portal");
    const services = database.collection("Services");

    // loaded all services data from database
    app.get("/services", async (req, res) => {
      const allServices = await services.find({}).toArray();
      res.json(allServices);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("start server on the browser.");
});

app.listen(port, () => {
  console.log("listen the server on port", port);
});

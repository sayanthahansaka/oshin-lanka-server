const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001;
require('dotenv').config()
// console.log(process.env.DB_USER)

// middleware
app.use(cors());
app.use(express.json());

// sayanthahansaka00
// oshinlanka098

// mongoDB Config

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@oshin-lanka-cluster.brnd0ts.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // database and collections
    const menuCollections = client.db("oshin-lanka-db").collection("menus");
    const cartCollections = client.db("oshin-lanka-db").collection("cartItems");

    // all menu item opareations
    app.get('/menu', async(req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
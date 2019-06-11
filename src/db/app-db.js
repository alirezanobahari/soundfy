import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://user_soundfy:en1EiKaPBbJmzztP@soundfy-fhiih.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  collection.insert()
  // perform actions on the collection object
  client.close();
});


export default client;

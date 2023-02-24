const mongoose = require("mongoose");
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI =
  "mongodb+srv://<username>:<password>@cluster0.8wgrvzn.mongodb.net/foodflyermern?retryWrites=true&w=majority";

module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
    if (err) console.log("---" + err);
    else {
      // var database =
      console.log("connected to mongo");
      const foodCollection = await mongoose.connection.db.collection(
        "food_items"
      );
      foodCollection.find({}).toArray(async function (err, data) {
        const categoryCollection = await mongoose.connection.db.collection(
          "foodCategory"
        );
        categoryCollection.find({}).toArray(async function (err, Catdata) {
          callback(err, data, Catdata);
        });
      });
      // listCollections({name: 'food_items'}).toArray(function (err, database) {
      // });
      //     module.exports.Collection = database;
      // });
    }
  });
};

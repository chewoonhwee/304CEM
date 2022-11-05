const mongoose = require("mongoose");

const db =
  "mongodb+srv://chew:Izutehwee2001@cluster0.5ql0uaj.mongodb.net/304CEM?retryWrites=true&w=majority";

mongoose

  .connect(db)

  .then(() => {
    console.log("Connected to database");
  })

  .catch(() => {
    console.log("Error Connecting to database");
  });

  const foodSchema = new mongoose.Schema({

    title: {type: String},
    image: {type: String},
    category: {type: String},
    area: {type: String},
    instruction: {type: String}
});

const Food = mongoose.model("menus", foodSchema);

module.exports = Food;
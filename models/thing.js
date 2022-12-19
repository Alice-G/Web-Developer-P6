const mongoose = require("mongoose");

const thingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true }, // make default/start 0
  dislikes: { type: Number, required: true }, // make default/start 0
  // ASK do we have the other two here?
});

module.exports = mongoose.model("Thing", thingSchema);

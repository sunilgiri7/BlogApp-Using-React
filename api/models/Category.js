const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: ["Feeling"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publicationYear: {
    type: Number,
    required: [true, "Year is required"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
});

module.exports = mongoose.model("Book", bookSchema);

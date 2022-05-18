const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    thumbnail: { type: String },
});

module.exports = ProductSchema;
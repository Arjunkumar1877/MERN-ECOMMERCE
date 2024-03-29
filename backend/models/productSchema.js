import mongoose from "mongoose";
const schema = mongoose.Schema;

const productSchema = new schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  new_price: {
    type: Number,
    required: true
  },
  old_price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
}, {timestamps: true});


export const Products = mongoose.model("product", productSchema);
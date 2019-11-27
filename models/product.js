// mongoose is a package to make schemas
const mongoose = require("mongoose");

// mongoose unique validator is a package used for mongoose. This package enables to process a unique varariable
const uniqueValidator = require('mongoose-unique-validator');
const {ObjectId} = mongoose.Schema


const productSchema = new mongoose.Schema(
  {
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
      },
      description: {
        type: String,
        required: true,
        maxlength: 2000
      },
      price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
      },
      category: {
        type: ObjectId,
        refer: "Category",
        required: true
      },
      quantity: {
        type: Number
      },
      sold: {
        type: Number,
        default: 0
      },
      photo: {
        data: Buffer,
        contentType: String
      },
      shipping: {
        required: false,
        type: Boolean
      }
  },
  {timestamps: true }
);



module.exports = mongoose.model("Product", productSchema)
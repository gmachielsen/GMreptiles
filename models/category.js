// mongoose is a package to make schemas
const mongoose = require("mongoose");

// mongoose unique validator is a package used for mongoose. This package enables to process a unique varariable
const uniqueValidator = require('mongoose-unique-validator');


const categorySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
      },
  },
  {timestamps: true }
);



module.exports = mongoose.model("Category", categorySchema)

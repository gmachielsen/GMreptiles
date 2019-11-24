// mongoose is a package to make schemas
const mongoose = require("mongoose");

// mongoose unique validator is a package used for mongoose. This package enables to process a unique varariable
const uniqueValidator = require('mongoose-unique-validator');

// The crypto module provides a way of handling encrypted data.
const crypto = require("crypto");

// Is a module to generate a timestamp
const uuidv1 = require("uuid/v1");

// var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        dropDups: true
      },
      hashed_password: {
        type: String,
        required: true,
      },
      about: {
        type: String,
        trim: true,
      },
      salt: String,
      role: {
        type: Number,
        default: 0
      },
      history: {
        type: Array,
        default: []
      }
  },
  {timestamps: true }
);

// virtualfield

userSchema
    .plugin(uniqueValidator)
    .virtual("password")
    .set(function(password) {
      this._password = password;
      this.salt = uuidv1()
      this.hashed_password = this.encryptPassword(password);
    });
userSchema.virtual("password")
    .get(function() {
        return this._password
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if(!password) return "";
        try {
          return crypto
              .createHmac("sha1", this.salt)
              .update(password)
              .digest("hex")
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema)

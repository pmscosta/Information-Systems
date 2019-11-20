'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    role: {
      type: String,
      enum: ['Coordinator', 'Doctor', 'Social Worker'],
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('user', userSchema);
module.exports = User;

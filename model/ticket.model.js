const mongoose = require("mongoose");
const { ticketStatus } = require("../utils/constants");
const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ticketPriority: {
    type: Number,
    min: 1,
    max: 10,
    default: () => {
      return Math.ceil(Math.random() * 10);
    },
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: ticketStatus.open,
  },
  reporter: String,
  assignee: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return new Date.now();
    },
  },

  updatedAt: {
    type: Date,
    default: () => {
      return new Date.now();
    },
  },
});

module.exports = mongoose.model("tickets", ticketSchema);

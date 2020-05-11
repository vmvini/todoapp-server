import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const Period = Schema({
  creation: {
    type: Date,
    required: true,
  },
  finish: {
    type: Date,
    required: true,
  },
});

const Task = Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  period: {
    type: Period,
    required: true
  },
  finished: {
    type: Boolean,
    default: false,
  },
});

export const Project = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: [Task],
});

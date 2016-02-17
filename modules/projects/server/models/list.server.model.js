'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * List Schema
 */
var ListSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'You need to specify a name'
  },
  tasks: [{
    type: Schema.ObjectId,
    ref: 'Task'
  }]
});

mongoose.model('List', ListSchema);

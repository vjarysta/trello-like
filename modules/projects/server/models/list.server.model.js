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
  project: {
    type: Schema.ObjectId,
    ref: 'Project'
  },
  tasks: [{
    type: Schema.ObjectId,
    ref: 'Task',
    default: []
  }]
});

mongoose.model('List', ListSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Task Schema
 */
var TaskSchema = new Schema({
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
  description: {
    type: String,
    default: '',
    trim: true
  },
  members: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  list: {
    type: Schema.ObjectId,
    ref: 'List'
  },
  project: {
    type: Schema.ObjectId,
    ref: 'Project'
  }
  
});

mongoose.model('Task', TaskSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Projects Schema
 */
var ProjectsSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Your project requires a name!'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  members: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
});

mongoose.model('Project', ProjectsSchema);

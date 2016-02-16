'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash'),
  Project = mongoose.model('Project');

/**
 * Create a 
 */
exports.create = function (req, res) {
  var project = new Project(req.body);
  project.owner = req.user._id;
  console.log(project);
  project.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Failed to create project'
      });
    } else {
      res.json(project);
    }
  });
};

/**
 * Show the current 
 */
exports.read = function (req, res) {

};

/**
 * Update a 
 */
exports.update = function (req, res) {

};

/**
 * Delete an 
 */
exports.delete = function (req, res) {

};

/**
 * List of 
 */
exports.list = function (req, res) {

};

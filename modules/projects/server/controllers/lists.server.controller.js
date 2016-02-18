'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  Project = mongoose.model('Project'),
  List = mongoose.model('List');

/**
 * Create a 
 */
exports.create = function (req, res) {
  var list = new List(req.body);
  list.project = req.project._id;
  list.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Failed to create list'
      });
    } else {
      Project.findById(req.project._id).exec(function(err, project) {
        project.lists.push(list._id);
        project.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: 'Failed to save list in project'
            });
          }
        });
      });
      res.json(list);
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
  List.find({ project: req.project._id }).exec(function(err, lists) {
    if (err) {
      return res.status(400).send({
        message: 'Error while getting lists'
      });
    } else {
      res.json(lists);
    }
  });
};

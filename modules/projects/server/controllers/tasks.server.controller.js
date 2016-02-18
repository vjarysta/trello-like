'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  Project = mongoose.model('Project'),
  List = mongoose.model('List'),
  Task = mongoose.model('Task');

/**
 * Create a 
 */
exports.create = function (req, res) {
  var task = new Task(req.body);
  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Failed to create task'
      });
    } else {
      List.findById(req.list).exec(function(err, list) {
        list.tasks.push(task._id);
        list.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: 'Failed to save task in list'
            });
          } else {
          }
        });
      });
      res.json(task);
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

/*
** Tasks middleware
*/

exports.TaskByID = function(req, res, next, id) {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task is invalid'
    });
  }
  
  Task.findById(id).populate('members').populate('list').exec(function(err, task) {
    if (err) {
      return next(err);
    } else if (!task) {
      return res.status(404).send({
        message: 'No Task with that identifier has been found'
      });
    }
    req.task = task;
    next();
  });
  
};
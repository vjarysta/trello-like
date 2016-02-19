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

var idIndexOf = function(haystack, needle) {
  var convertedHaystack = _.map(haystack, function(obj) { return obj._id.toString(); });
  return _.indexOf(convertedHaystack, needle._id.toString());
};

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
  var task = req.task;
  
  task.name = req.body.name;
  task.description = req.body.description;
  task.members = req.body.members;
  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Cannot update this task'
      });
    } else {
      res.json(task);
    }
  });
};

/**
 * Delete an 
 */
exports.delete = function (req, res) {
  var project = req.project;
  var list = req.list;
  var task = req.task;
  
  var indexOfList = idIndexOf(list.tasks, task);
  list.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Cannot get the list corresponding to this task'
      });
    } else {
      // Can now really delete the task
      task.remove(function(err) {
        if (err) {
          return res.status(400).send({
            message: 'Cannot remove this task'
          });
        } else {
          res.json(task);
        }
      });
    }
  });
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
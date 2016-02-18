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

var idIndexOf = function(haystack, needle) {
  var convertedHaystack = _.map(haystack, function(obj) { return obj.toString(); });
  return _.indexOf(convertedHaystack, needle.toString());
};

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
  var project = req.project;
  var list = req.list;
  var indexOfList = idIndexOf(req.project.lists, req.list);
  
  project.lists.splice(indexOfList, 1);
  project.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Can\'t get list\' project'
      });
    } else {
      // Can now really delete the list
      list.remove(function(err) {
        if (err) {
          return res.status(400).send({
            message: 'Cannot remove this list'
          });
        } else {
          res.json(list);
        }
      });
    }
  });
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


exports.ListByID = function(req, res, next, id) {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'List is invalid'
    });
  }
  
  List.findById(id).exec(function(err, list) {
    if (err) {
      return next(err);
    } else if (!list) {
      return res.status(404).send({
        message: 'No list with that identifier has been found'
      });
    }
    req.list = list;
    next();
  });
  
};
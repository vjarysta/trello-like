'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  Project = mongoose.model('Project');

/**
 * Create a project
 */
exports.create = function (req, res) {
  var project = new Project(req.body);
  project.owner = req.user._id;
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
  var project = req.project ? req.project.toJSON() : {};
  
  // Add a custom field to the Project, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Project model
  project.isCurrentUserOwner = req.user && project.owner && project.owner._id.toString() === req.user._id.toString() ? true : false;
  
  res.json(project);
};

/**
 * Update a 
 */
exports.update = function (req, res) {
  var project = req.project;
  
  console.log(req.body);
  project.name = req.body.name;
  project.description = req.body.description;
  project.members = req.body.members;
  project.save(function(err) {
    if (err) {
      console.log('error');
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

/**
 * Delete an 
 */
exports.delete = function (req, res) {
  var project = req.project;
  
  project.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Cannot remove this project'
      });
    } else {
      res.json(project);
    }
  });
};

/**
 * List of 
 */
exports.list = function (req, res) {
  Project.find().sort('-created').populate('owner').exec(function(err, projects) {
    if (err) {
      return res.status(400).send({
        message: 'Error while getting projects list'
      });
    } else {
      res.json(projects);
    }
  });
};

/*
** Project middleware
*/

exports.ProjectByID = function(req, res, next, id) {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Project is invalid'
    });
  }
  
  Project.findById(id).populate('owner').populate('lists').exec(function(err, project) {
    if (err) {
      return next(err);
    } else if (!project) {
      return res.status(404).send({
        message: 'No project with that identifier has been found'
      });
    }
    // Populates tasks
    Project.populate(project, { path: 'lists.tasks', model: 'Task' }, function(err, tasks) {
      if (err) {
        return res.status(400).send({
          message: 'Cannot populate tasks'
        });
      } else {
        req.project = project;
        next();
      }
    });
  });
  
};
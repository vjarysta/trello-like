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
  
  Project.findById(id).populate('owner').exec(function(err, project) {
    if (err) {
      return next(err);
    } else if (!project) {
      return res.status(404).send({
        message: 'No project with that identifier has been found'
      });
    }
    req.project = project;
    next();
  });
  
};
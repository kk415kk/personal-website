/**
 * PageController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PageController)
   */
  //_config: {}
  contact: function(req, res) {
  	res.view({
  		title: 'Contact'
  	})
  },

  projects: function(req, res) {
    Project.find().done(function projectsFound(err, projects) {
      if (err) projects = [];
      projects = sails.config.util.sortProjects(projects);

      res.view({
        title: 'Projects',
        projects: projects
      })
    });
  },

  research: function(req, res) {
    res.view({
      title: 'Research'
    })
  },

  blogs: function(req, res) {
    Blog.find().done(function(err, blogs) {
      if (err) {
        // do something
      }
      res.view({
        title: 'Blog',
        blogs: blogs
      });
    });    
  },

  west_nile_analytics: function(req, res) {
    res.view({
      title: 'West Nile Analytics'
    });
  },

  google_maps_ml: function(req, res) {
    res.view({
      title: 'Google Maps Machine Learning'
    })
  },

  d3_playground: function(req, res) {
    var d3 = require('d3');
    res.view({
      title: 'D3.js Playground'
    })
  }
};

/**
 * ProjectController
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
   * (specific to ProjectController)
   */
  //_config: {}

  new: function(req, res) {
    res.view({
      title: 'Add Project'
    })
  },
  create: function(req, res) {
    params =  req.params.all();
    params.description = params.description.replace(/\n/g, "<br>");

  	Project.create(params, function projectCreated(err, project) {
  	  if (err) {
  	  	req.session.messages = { error: ["Error while creating project"] };
        return res.redirect('/project/add');
  	  } else {
  	  	req.session.messages = { success: ["Successfully created project"] };
        return res.redirect('/project/manage');
  	  }
  	});
  },
  edit: function(req, res) {
    Project.findOne().where({ id: req.params.all().id }).done(function(err, project) {
      if (err) {
        req.session.messages = { error: ["Error editing project"] };
        return res.redirect('/project/manage');
      }
      project.description = project.description.replace(/<br>/g, '');
      res.view({
        title: 'Edit Project',
        project: project
      })
    });
  },
  destroy: function(req, res) {
  	Project.destroy(req.params.all().id, function(err) {
  	  if (err) {
  	  	req.session.messages = { error: ["Error deleting project"] };
  	  } else {
  	  	req.session.messages = { success: ["Successfully deleted project"] };
  	  }
  	  return res.redirect('/project/manage');
  	});
  },
  manage: function(req, res) {
    Project.find().done(function foundProjects(err, projects) {
      if (err) projects = [];
      res.view({
        title: 'Manage Projects',
        projects: projects
      });
    });
  },
  save: function(req, res) {
    params = req.params.all();
    params.description = params.description.replace(/\n/g, "<br>");
    function fieldSet(field, dict) {
      if (dict[field] == "") {
        return false;
      }
      return true;
    };

    Project.findOne().where({id: params.id}).done(function(err, project) {
      if (err) {
        console.log(err)
        req.session.messages = { error: ["Error updating project"] };
        return res.redirect('project/manage');
      } else {
        if (fieldSet('name', params)) project.name = params.name;
        if (fieldSet('description', params)) project.description = params.description;
        if (fieldSet('start_date', params)) project.start_date = params.start_date;
        if (fieldSet('end_date', params)) project.end_date = params.end_date;
        if (fieldSet('technology', params)) project.technology = params.technology;

        project.save(function(err) {
          if (err) {
            req.session.messages = { error: ["Error updating project"] };
          } else {
            req.session.messages = { success: ["Successfully updated project"] };
          }
          return res.redirect('project/manage');
        });
      }
    });
  }
  
};

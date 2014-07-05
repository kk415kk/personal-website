/**
 * BlogController
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
   * (specific to BlogController)
   */
  //_config: {}

  create: function(req, res) {
    params =  req.params.all();
    params.body = params.body.replace(/\n/g, "<br>");

  	Blog.create(params, function blogCreated(err, blog) {
  		if (err) {
  			// do something
  		}
      console.log(blog);
  		return res.redirect('/blog');
  	});
  },
  destroy: function(req, res) {
  	Blog.destroy(req.params.all().id, function(err) {
      if (err) {
        req.session.messages = { error: ["Error deleting blog entry"] };
      } else {
        req.session.messages = { success: ["Successfully deleted blog entry"] };
      }
      return res.redirect('/blog/manage');
    });
  },
  edit: function(req, res) {
    Blog.findOne().where({ id: req.params.all().id }).done(function(err, blog) {
      if (err) {
        req.session.messages = { error: ["Error editing blog entry"] };
        return res.redirect('/blog/manage');
      }
      blog.body = blog.body.replace(/<br>/g, '');
      res.view({
        title: 'Edit Blog Entry',
        blog: blog
      })
    });
  },
  manage: function(req, res) {
    Blog.find().done(function(err, blogs) {
      if (err) {
        // do something
      }
      res.view({
        title: 'Manage Blog',
        blogs: blogs
      });
    });
  },
  new: function(req, res) {
    res.view({
      title: 'New Entry'
    });
  },
  save: function(req, res) {
    params = req.params.all();
    params.body = params.body.replace(/\n/g, "<br>");
    function fieldSet(field, dict) {
      if (dict[field] == "") {
        return false;
      }
      return true;
    };

    Blog.findOne().where({id: params.id}).done(function(err, blog) {
      if (err) {
        console.log(err)
        req.session.messages = { error: ["Error updating blog"] };
        return res.redirect('blog/manage');
      } else {
        if (fieldSet('title', params)) blog.title = params.title;
        if (fieldSet('body', params)) blog.body = params.body;
        if (fieldSet('category', params)) blog.category = params.category;
        if (fieldSet('tags', params)) blog.tags = params.tags;

        blog.save(function(err) {
          if (err) {
            req.session.messages = { error: ["Error updating blog"] };
          } else {
            req.session.messages = { success: ["Successfully updated blog entry"] };
          }
          return res.redirect('blog/manage');
        });
      }
    });    
  }
};

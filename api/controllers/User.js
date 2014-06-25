/**
 * UserController
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
   * (specific to AdminController)
   */
  //_config: {}

  admin_panel: function(req, res) {
    res.view({
    	title: 'Admin Panel';
    })
  },
  create: function(req, res) {
  	User.create(req.params.all(), function userCreated(err, user) {
      if (err) return res.redirect('/register');
      var expiresAt = new Date(new Date().getTime() + 3600000);
      req.session.cookie.expires = expiresAt;
      req.session.authenticated = true;
      req.session.user = user;
  	});
  }
  login: function(req, res) {
  	res.view({
  		title: 'Login';
  	});
  },
  logout: function(req, res) {
  	req.session.cookie.expires = new Date().getTime();
  	req.session.authenticated = false;
  	req.session.user = null;
  	res.redirect('/');
  },
  manage: function(req, res) {
    if (req.session.user.admin) {
      return res.redirect('/user/admin_panel');
    } else {
      return res.redirect('/');
    }
  },
  register: function(req, res) {
  	res.view({
  		title: 'Register';
  	});
  },
  validate: function(req, res) {
  	var bcrypt = require('bcrypt');
  	if (!(req.body.email && req.body.password)) {
  		return res.redirect('/login');
  	}

  	var isEmail = (req.body.email.indexOf('@') != -1)
    function setSession(user, correct_pass, check_pass) {
      bcrypt.compare(correct_pass, check_pass, function(err, match) {
        if (err || !match) return res.redirect('/login');
        var expiresAt = new Date(new Date().getTime() + 3600000);
        req.session.cookie.expires = expiresAt;
        req.session.authenticated = true;
        req.session.user = user;
        return res.redirect('/user/manage');
      });
    }

  	if (isEmail) {
      User.findOneByEmail(req.body.email).done(function(err, user) {
      	if (err || !user) return res.redirect('/login');
        setSession(user, user.password, req.body.password);
      });
  	} else {
      User.findOneByUsername(req.body.email).done(function(err, user) {
        if (err || !user) return res.redirect('/login');
        setSession(user, user.password, req.body.password);
      });
  	}
  }
};

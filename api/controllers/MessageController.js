/**
 * MessageController
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
   * (specific to MessageController)
   */
  //_config: {}

  create: function(req, res) {
  	params = req.params.all();
    User.findOne().where({ username: 'kk415kk' }).done(function kevinFound(err, kevin) {
    	params['deliverTo'] = kevin['id'];
      
    	Message.create(params, function messageCreated(err, message) {
        if (err) {
          req.session.messages = { error: ["Unable to submit message - please try again later."] };
        } else {
          req.session.messages = { success: ["Successfully sent message - expect a response within 24 to 48 hours."] };
        }
        return res.redirect('/contact');
    	});
    });
  },
  destroy: function(req, res) {
    Message.destroy(req.params.all().id, function(err) {
      if (err) {
        req.session.messages = { error: ["Error deleting message"] };
      } else {
        req.session.messages = { success: ["Successfully deleted message"] };
      }
      return res.redirect('/messages/manage');
    })
  },
  manage: function(req, res) {
    Message.find().where({ deliverTo: req.session.user.id }).done(function messagesFound(err, msgs) {
      if (err) {
        req.session.messages = { error: ["Error loading messages..."] }
      }
      res.view({
        title: 'Messages',
        messages: msgs
      });
    });
  }

  
};

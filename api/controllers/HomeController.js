/**
 * HomeController
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
   * (specific to HomeController)
   */
  //_config: {}

  index: function(req, res) {
    var request = require('request');
    var options = {
        uri: 'https://api.github.com/repos/kk415kk/personal-website/commits',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'kk415kk'
        }
    };

    var github_info = null;

    request.get(options, function(err, response, body) {
      if (err) {
        github_info = "error while retrieving Github information";
      } else {
        body = JSON.parse(body)[0];
        github_info = {
          sha: body["sha"],
          url: body["url"],
          date: body["commit"]["committer"]["date"],
          message: body["commit"]["message"]
        };
      }

      res.view({
        title: 'Home',
        github: github_info
      });
    });
  }
  
};

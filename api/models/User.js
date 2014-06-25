/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    }
    email: {
      type: 'string',
      email: true,
      unique: true
    },
    admin: {
      type: 'boolean',
      defaultsTo: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj._csrf;
      return obj;
    },
    beforeCreate: function(values, next) {
      var bcrypt = require('bcrypt');

      if (!values.password || values.password != values.confirmation) {
        return next({err: ["Passwords to not match."]});
      }

      // Encrypt password
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(values.password, salt, function(err, encrypted) {
          if (err) return next(err);
          values.password = encrypted;
          next();
        });
      });
    }
  }

};

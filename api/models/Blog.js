/**
 * Blog
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
  	title: {
      type: 'string',
      defaultsTo: ''
    },
  	body: {
      type: 'text',
      defaultsTo: ''
    },
  	category: {
      type: 'string',
      defaultsTo: 'uncategorized'
    },
  	tags: {
      type: 'array',
      defaultsTo: ['none']
    },
  	author: {
      type: 'string',
      defaultsTo: 'Kevin'
    },
  	type: {
      type: 'string',
      defaultsTo: 'Published'
    }
  },

  beforeCreate: function(values, next) {
    if (values.tags != '') {
      var tagList = values.tags.split(",");
      values['tags'] = tagList;
    } else {
      values['tags'] = ['none']
    }

    if (values.category == '') {
      values['category'] = 'uncategorized'
    }

    return next();
  }
};

/**
 * Project
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
    name: {
      type: 'string',
      required: true
    },
    technology: {
      type: 'string',
      required: false
    },
    description: {
      type: 'string',
      required: false
    },
    start_date: {
      type: 'string',
      required: true
    },
    end_date: {
      type: 'string',
      required: true
    }
  }

};

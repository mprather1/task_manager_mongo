var UserView = require("./UserView");

var UsersView = Backbone.Marionette.CollectionView.extend({
  
  tagName: 'select',
  childView: UserView
});

module.exports = UsersView;
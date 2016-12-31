var UserView = require("./UserView");

var UsersView = Backbone.Marionette.CollectionView.extend({
  tagName: 'select',
  childView: UserView,
  initialize: function(){
    this.collection.comparator = 'last_name'
    this.collection.sort()
  }  
});

module.exports = UsersView;
var UserView = Backbone.Marionette.View.extend({
  tagName: 'option',
  attributes: {
    name: 'user',
  },
  initialize: function(){
    var full_name = this.model.get('first_name') + ' ' + this.model.get('last_name')
    this.$el.attr('value', full_name)
  },
  template: require("../templates/user-view-template.html"),
});

module.exports = UserView;
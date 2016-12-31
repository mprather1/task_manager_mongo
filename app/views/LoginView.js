var LoginView = Backbone.Marionette.View.extend({
  tagName: 'div',
  template: require("../templates/login-view-template.html"),
  onRender: function(){
    $('#new-task').remove();
  }
});

module.exports = LoginView;
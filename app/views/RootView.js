var NavigationView = require("./NavigationView");
var Session =require("../models/Session");
var RootView = Backbone.Marionette.View.extend({
 
  tagName: 'container-fluid',
 
  template: require("../templates/root-view-template.html"),
 
  regions: {
    header: {
      el: "#header-view"
    },
    main: {
      el: "#main-view"
    },
    footer: {
      el: '#footer-view'
    }
  },
 
  initialize: function(){
    this.render();
    this.session = new Session()
  },
 
  onRender: function(){
    this.showChildView('header', new NavigationView({ title: "Task Manager" }));
  }

});

module.exports = RootView;
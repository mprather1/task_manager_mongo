var User = Backbone.Model.extend({
  urlRoot: "http://shintech.ninja:8000/api/tasks/active",
  
  initialize: function(){
    _.each(this.attributes, function(val, key){
      this.set(key, this.sanitize(val));
    }, this);
  },
  
  sanitize: function(str){
    return _.escape(str);
  },
  
});

module.exports = User;
require('jquery');
require('jquery-ui'); 
require('bootstrap');
require("modules/jquery-ui-dist/jquery-ui.css");
require("modules/jquery-ui-dist/jquery-ui.theme.css");

var App = require("./App");

_.extend(Backbone.Validation.callbacks, {
  valid: function (view, attr, selector) {
    var $el = view.$('[name=' + attr + ']'), 
        $group = $el.closest('.form-group');
    $group.removeClass('has-error');
    $group.find('.help-block').html('').addClass('hidden');
  },
  invalid: function (view, attr, error, selector) {
    var $el = view.$('[name=' + attr + ']'), 
      $group = $el.closest('.form-group');
    $group.addClass('has-error');
    var help_block = $group.find('.help-block');
    help_block.html(error).removeClass('hidden');
  }
});

var originalSync = Backbone.sync;
Backbone.sync = function(method, model, options){
  var deferred = $.Deferred();
  // options || (options = {});
  deferred.then(options.success, options.error);
  
  var response = originalSync(method, model, _.omit(options, 'success', 'error'));
  
  response.done(deferred.resolve);
  response.fail(function(){
    if(response.status == 401){
      Backbone.history.navigate('#login', { trigger: true });
    } else if (response.status === 403){
      alert(response.responseJSON.message);
    } else {
      deferred.rejectWith(response, arguments);
    }
  });
  return deferred.promise();
};

var app = new App();

app.start();

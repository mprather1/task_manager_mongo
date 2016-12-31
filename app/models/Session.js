var Session = Backbone.Model.extend({
  urlRoot: 'http://shintech.ninja:8000/session',
  // defaults: {
  //   sessionID: '',
  //   sessionUsername: '',
  // }
  initialize: function(){
    // console.log(this)
    // this.fetch()
    // console.log(this)
    $.getJSON('/session', function(data){
      if (data.passport && data.passport.user.hasOwnProperty('username')){
        $('#logged-in').append(data.passport.user.username)
      }
    })
  },
  
});

module.exports = Session;
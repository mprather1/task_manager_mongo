var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect
var User = require('../db/models/User');
var agent = require("supertest").agent(server)
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

chai.use(chaiHttp);

describe('Users', function(){
  
  before(function(done){
    User.collection.drop(done())
  })

  
  beforeEach(function(done){
    var newUser = new User({
      first_name: "giant",
      last_name: 'douche',
      email: 'email',
      username: 'killbill',
      password: "$2a$10$Y0jvpVrZtzcJoXATFT.FP.axRmIPDckJZsDx3dRcajnrZQo5uHtZi"
    });
    newUser.save(function(err){
      if(err){ console.log(err) }
      done()
    });
  });
  
  afterEach(function(done){
    User.collection.drop(done());
  });
  
  it('should sign in', function (done) {
    agent.post('/login')
      .send({ "username": 'killbill', "password": 'password' })
      .expect(200)
      .end(function(err, res){
        expect(res).to.have.status(302)
        done()
      });
  });  
  

  it('GET should list All users at /api/users', function(done){
    agent.get('/api/users')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]).to.have.property('username');
      done();
    });
  });
  
  it('GET should list a SINGLE user at /api/user/:id ', function(done) {
    agent.get('/api/users')
      .end(function(err, res){
        agent.get('/api/users/' + res.body[0]._id)
          .end(function(err, res){
            expect(res).to.be.json;
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('_id')
            expect(res.body).to.have.property('username')
            done()
          })
      })
  });
  
  it("POST should add a single user", function(done) {
    agent
    .post('/api/users')
    .send({"username": "killbill", "password":"password", "first_name":"Donald", "last_name":"Trump", "email":"Hillary@PrivateServer.com" })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.status("success");
      done();
    });
  });
  
  it('PUT should update a single user at /api/users/:id', function(done) {
    agent
    .get('/api/users')
    .end(function(err, res){
      agent
      .put('/api/users/' + res.body[0]._id)
      .send({"password": "turdsandwich"})
      .end(function(error, response){
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.status('success');
        done();
      });
    });
  });
  
  it('DELETE should delete a single user at /api/users/:id', function(done) {
    agent
    .get("/api/users")
    .end(function(err, res){
      agent
      .delete("/api/users/" + res.body[0]._id)
      .end(function(error, response){
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.status('success');
        done();
      });
    });
  });
});
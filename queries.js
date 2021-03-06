var User = require("./db/models/User");
var Task = require("./db/models/Task");

// Users
/////////////////////////////////////////////////////////////////

function getAllUsers(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    User.find(function(err, user){
      if (err){ res.send(err); }
      res.json(user);
    });
  }
}

function getSingleUser(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    User.findById(req.params.id, function(err, user){
      if (err){ res.send(err); }
      res.status(200)
      .json(user);
    });
  }
}

function createUser(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {
    var user = new User();
    user.username = req.body.username;
    user.password = user.generateHash(req.body.password);
    user.email = req.body.email;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.save(function(err){
      if(err){ res.send(err) }    
      res.status(200)
        .json({ 
          status: 'success', 
          message: "Created one user..."
        })
    })
  }
}

function updateUser(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    User.findById(req.params.id, function(err, user){
      if (err){ res.send(err) }
      user.password = req.body.password;
      user.save(function(err){
        if (err){ res.send(err); }
        res.status(200)
          .json({ 
            status: 'success', 
            message: "User updated..." 
          });
      });
    });
  }
}

function removeUser(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    User.remove({
      _id: req.params.id
    }, function(err, user){
      if (err){ res.send(err) }
      res.status(200)
        .json({
          status: 'success', 
          message: 'User deleted...'
        })
    })
  }
}

// Tasks
/////////////////////////////////////////////////////////////////

function getAllTasks(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    Task.find(function(err, task){
      if(err){ res.send(err) }
      res.status(200)
        .json(task)
    })
  }
}

function getCompletedTasks(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {

  Task.find({ completed: true }, function(err, task){
    if(err){ res.send(err) }
    res.status(200)
      .json(task)
  })
  }
}

function getActiveTasks(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    Task.find({ completed: false }, function(err, task){
      if(err){ res.send(err) }
      res.status(200)
        .json(task)
    })
  }
}

function getSingleTask(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    User.findById(req.params.id, function(err, task) {
        if(err){ res.send(err) }
        res.status(200)
          .json(task)
    })
  }
}

function createTask(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
  var full_name = function(){
    if (req.session.passport.user !== undefined){
      return req.session.passport.user.first_name + " " + req.session.passport.user.last_name;  
    } else {
      return 'not logged in'
    }
  }    
  var task = new Task();
  task.completed = false;
  task.location_number = req.body.location_number;
  task.project = req.body.project;
  task.descrip = req.body.descrip;
  task.priority = req.body.priority;
  task.requestor = full_name()
  task.assigned_to = req.body.assigned_to;
  task.due_date = req.body.due_date;
  task.notes = req.body.notes;
  task.save(function(err){
    if(err){ res.send(err) }
    res.status(200)
      .json({
        status: 'success', 
        message: "Updated user"
      })
    })
  }
}

function updateTask(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    Task.findById(req.params.id, function(err, task){
      if (err){ res.send(err) }
      task.completed = req.body.completed;
      task.save(function(err){
        if (err){ res.send(err); }
        res.status(200)
          .json({ 
            status: 'success',
            message: "Task completed..."
          });
      });
    });
  }
}

function removeTask(req, res){
  if (req.session.passport === undefined){
    res.status(401)
      .send('Not authorized')
  } else {  
    Task.remove({
      _id: req.params.id
    }, function(err, task){
      if (err){ res.send(err) }
      res.status(200)
        .json({ 
          status: 'success',
          message: 'Task deleted...'
        })
    })
  }
}

module.exports = {
  
  // Users
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,
  
  // Tasks
  getAllTasks: getAllTasks,
  getCompletedTasks: getCompletedTasks,
  getActiveTasks: getActiveTasks,
  getSingleTask: getSingleTask,
  createTask: createTask,
  updateTask: updateTask,
  removeTask: removeTask  
};
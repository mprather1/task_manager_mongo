require 'json'
require 'faker'

File.open('seeds/tasks.json', 'w') do |file|
file.puts('[')  
8.times do
  @location_number = Faker::Number.number(3)
  @descrip = Faker::Hacker.say_something_smart
  @requestor = Faker::Name.name
  @assigned_to = Faker::Name.name
  @due_date = Faker::Date.forward(365)
  @notes = Faker::Hipster.sentence(3, false, 4)

  my_hash = {
    completed: false,
    location_number: @location_number,
    project: "project",
    descrip: @descrip,
    priority: "low",
    requestor: @requestor,
    assigned_to: @assigned_to,
    due_date: @due_date,
    notes: @notes
  }
  file.puts(JSON.generate(my_hash) + ",")
end

8.times do
  @location_number = Faker::Number.number(3)
  @descrip = Faker::Hacker.say_something_smart
  @requestor = Faker::Name.name
  @assigned_to = Faker::Name.name
  @due_date = Faker::Date.forward(365)
  @notes = Faker::Hipster.sentence(3, false, 4)

  my_hash = {
    completed: false,
    location_number: @location_number,
    project: "task",
    descrip: @descrip,
    priority: "med",
    requestor: @requestor,
    assigned_to: @assigned_to,
    due_date: @due_date,
    notes: @notes
  }
  file.puts(JSON.generate(my_hash) + ",")
end

8.times do
  @location_number = Faker::Number.number(3)
  @descrip = Faker::Hacker.say_something_smart
  @requestor = Faker::Name.name
  @assigned_to = Faker::Name.name
  @due_date = Faker::Date.forward(365)
  @notes = Faker::Hipster.sentence(3, false, 4)

  my_hash = {
    completed: true,
    location_number: @location_number,
    project: "project",
    descrip: @descrip,
    priority: "high",
    requestor: @requestor,
    assigned_to: @assigned_to,
    due_date: @due_date,
    notes: @notes
  }
  file.puts(JSON.generate(my_hash) + ",")
end

file.puts("]")
end

File.open('seeds/users.json', 'w') do |file|
file.puts('[')  
8.times do
  @first_name = Faker::Name.first_name
  @last_name = Faker::Name.last_name
  @username = Faker::Internet.user_name
  @email = Faker::Internet.safe_email(@first_name)

  my_hash = {
    first_name: @first_name,
    last_name: @last_name,
    password: "$2a$10$Y0jvpVrZtzcJoXATFT.FP.axRmIPDckJZsDx3dRcajnrZQo5uHtZi",
    username: @username,
    email: @email
  }
  file.puts(JSON.generate(my_hash) + ",")
end

mprather = {
  first_name: "Michael",
  last_name: "Prather",
  password: "$2a$10$Y0jvpVrZtzcJoXATFT.FP.axRmIPDckJZsDx3dRcajnrZQo5uHtZi",
  username: "mprather",
  email: Faker::Internet.safe_email("Mike")
}

killbill = {
  first_name: "Kill",
  last_name: "Bill",
  password: "$2a$10$Y0jvpVrZtzcJoXATFT.FP.axRmIPDckJZsDx3dRcajnrZQo5uHtZi",
  username: "killbill",
  email: Faker::Internet.safe_email("killbill")
}

file.puts(JSON.generate(mprather) + ",")
file.puts(JSON.generate(killbill) + ",")

file.puts("]")
end
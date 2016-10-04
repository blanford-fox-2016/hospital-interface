// Writing...
var fs = require("fs");
let listKaryawan = [
  {
    id: 1,
    name: 'John',
    age: 90,
    position: 'dokter',
    level : 'admin',
    username: 'john',
    password: 'hellojohn'
  },

  {
    id: 2,
    name: 'Doe',
    age: 91,
    position: 'dokter',
    level : 'admin',
    username: 'doe',
    password: 'hellodoe'
  }
]

fs.writeFile( "karyawan.json", JSON.stringify( listKaryawan ), "utf8", function(err){
  if (err) {
    console.log("Error");
  } else {
    console.log("success");
  }
});

// And then, to read it...
// myJson = require("./filename.json");

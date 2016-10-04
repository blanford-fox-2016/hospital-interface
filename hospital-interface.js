const fs = require('fs');
const readline = require('readline');


let listPasien = fs.readFileSync('pasien.json');
let listKaryawan = fs.readFileSync('karyawan.json');
let pattern = /\d/;
let parsePasien = JSON.parse(listPasien);
let parseKaryawan = JSON.parse(listKaryawan);

let usernameKar = [];
let passwordKar = [];
// console.log(parsePasien[0].name);

class Hospital{
  constructor(args={}){
    this.hospitalName = args['hospitalName'];
    this.address = args['address'];
    this.numKaryawan = args['numKaryawan'];
    this.numPasien = args['numPasien'];
  }
}

class Pasien{
  constructor(args={}){
    this._name = args['name'],
    this._age = args['age'],
    this._date_admitted = args['date_admitted'],
    this._date_released = args['date_released'] || 0;
    this._id = args['id']

  }
}
class Karyawan{
  constructor(args={}){
    this._name = args['name'],
    this._age = args['age'],
    this._position = args['position'],
    this._level = args['level'],
    this._id = args['id'],
    this._username = args['username'],
    this._password = args['password']
  }
}

class Dokter extends Karyawan{

  constuctor(name, age, position, level){
    // super(name, age, position, level);
  }
}

class Perawat extends Karyawan{

  constuctor(name, age, position, level){
    // super(name, age, position, level);
  }
}

class Staff extends Karyawan{

  constuctor(name, age, position, level){
    // super(name, age, position, level);
  }
}

class OfficeBoy extends Karyawan{

}

class Login {
  constructor() {
    this.karyawan = parseKaryawan;
  }

  getUName() {
    for (var i = 0; i < parseKaryawan.length; i++) {
      usernameKar.push(parseKaryawan[i].username);
    }
  }
  //
  getPass() {
    for (var i = 0; i < parseKaryawan.length; i++) {
      passwordKar.push(parseKaryawan[i].password);
    }
  }
}

let login = new Login();
login.getUName();
login.getPass();
console.log();

// var Henry = {
//   id : parsePasien[parsePasien.length - 1].id + 1,
//   name : "Henry",
//   age : "29",
//   date_admitted : "09-10-2016",
//   date_released : "14-10-2016"
// }
// var henry = new Pasien(Henry);
// function test() {
//   parsePasien.push(Henry);
// }
// test();
// console.log(parsePasien);
//
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});


console.log("Welcome to Hacktiv Hospital! \n------------------------");
rl.setPrompt("Please enter a username:\n")

rl.prompt();

rl.on('line', (line) =>{
  if (usernameKar.indexOf(line) !== -1){
    var indexuser = usernameKar.indexOf(line);
    rl.setPrompt("Now, enter the password of " + line + "\n");
    rl.prompt();

    rl.on('line', (line) =>{
      if (passwordKar.indexOf(line) === -1 || passwordKar.indexOf(line) != indexuser) {
        console.log("Failed to login!");
        rl.close()
      }
      else {
        console.log("Login success!");
        rl.close()
      }
    })
  }
  else{
    console.log("Username not found! Try again!");
    rl.prompt();
  }

})

// rl.on('line', (line) => {
//   if (line === "list-pasien") {
    // console.log(parsePasien);
    // rl.close();
//   }
//   else {
//   console.log("type 'quit' to close program ");
//   rl.prompt();
//   }
// });

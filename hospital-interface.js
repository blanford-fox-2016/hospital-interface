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
var sessionLevel = ""

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


class Interface {
  constructor() {

  }
  updJSON(file, newdata) {
    fs.writeFile(file, JSON.stringify(newdata), "utf8", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`\nData ${file} updated!\n`);
      }
      rl.question("Press enter to continue.", (input)=>{
        this.start()
    })

    })
  }
  list() {
    if(sessionLevel == 'dokter' || sessionLevel == 'nurse' || sessionLevel == 'receptionist'){
      for (var i = 0; i < parsePasien.length; i++) {
        console.log("-----------------------------------");
        console.log(`id: ${parsePasien[i].id}`);
        console.log(`name: ${parsePasien[i].name}`);
        console.log(`age: ${parsePasien[i].age}`);

      }
      rl.question("Press enter to continue.\n", (input) =>{
        this.start()
      })
    }
    else {
      console.log("You are not allowed to access this feature!");
      rl.question("Press enter to continue.", (input)=>{
        this.start()
    })
    }

  }
  viewrecords(pid) {
    if(sessionLevel == 'dokter' || sessionLevel == 'nurse' || sessionLevel == 'receptionist'){
      for (var i = 0; i < parsePasien.length; i++) {
        if(parsePasien[i].id == pid){
          console.log(parsePasien[i].records);
        }
      }
      rl.question("Press enter to continue.\n", (input) =>{
        this.start()
      })
    }
    else{
      console.log("You are not allowed to access this feature!");
      rl.question("Press enter to continue.", (input)=>{
        this.start()
    })
    }
  }
  addrecord(pid, keluhan) {
    if(sessionLevel == 'receptionist' || sessionLevel == 'dokter'){
      for (var i = 0; i < parsePasien.length; i++) {
        if(parsePasien[i].id == pid){
          parsePasien[i].records.push({
            'id': parsePasien[i].records.length+1,
            'keluhan': keluhan,
            'date_admitted': new Date(),
            'date_released': '',
          })
          this.updJSON('pasien.json', parsePasien);
        }
      }

    }
    else{
      console.log("You are not allowed to access this feature!");
      rl.question("Press enter to continue.", (input)=>{
        this.start()
    })
    }

  }
  removerecord(pid, rid) {
    if(sessionLevel == 'receptionist'){
      for (var i = 0; i < parsePasien.length; i++) {
        if(parsePasien[i].id == pid){
          for (var j = 0; j < parsePasien[i].records.length; j++) {
            if(parsePasien[i].records[j].id == rid){
              parsePasien[i].records.splice(j, 1)
            }
          }
        }
      }
      this.updJSON('pasien.json', parsePasien);
    }
    else {
      console.log("You are not allowed to access this feature!");
      rl.question("Press enter to continue.", (input)=>{
        this.start()
    })
    }

  }

  start(){
    rl.question("What would you like to do?\nOptions:\n-list_patients\n-view_records <patient_id>\n-add_record <patient_id> <keluhan>\n-remove_record <patient_id> <record_id>\n-exit\n\n", (input) =>{
      var cmd = input.split(' ');
      var key = cmd[0];
      var arg = cmd[1];
      var arg_ = cmd.splice(2, cmd.length-2);
      switch (key) {
        case "list_patients":
          this.list()
          break;
        case "view_records":
          this.viewrecords(arg)
          break;
        case "add_record":
          this.addrecord(arg,arg_.join(" "))
          break;
        case "remove_record":
          this.removerecord(arg,arg_.join(""))
          break;
        case "exit":
          rl.close();
          break;
        default:
          console.log("Please input a valid command.");
          this.start()
      }

    })
  }
}
let hospitalInterface = new Interface()


class Login {
  constructor() {
    this.karyawan = parseKaryawan;
  }
  cekUName(username) {
    this.getUName()
    if(usernameKar.indexOf(username) >= 0){
      rl.question("Please enter a password:\n", (password) => {
        this.cekPass(password)
      })
    }
    else{
        console.log("Invalid username\n");
        rl.question("Please enter a username:\n", (username) =>{
          this.cekUName(username)
        })
    }
  }
  cekPass(password){
    this.getPass()
    let idx = passwordKar.indexOf(password);
    if (idx >= 0) {
      console.log(`\nHello, ${usernameKar[idx]}, your access level is: ${parseKaryawan[idx].position.toUpperCase()}\n`);
      sessionLevel += parseKaryawan[idx].position;
      hospitalInterface.start()
    }
    else{
      console.log("Invalid password!\n");
      rl.question("Please enter a password:\n", (password)=>{
        this.cekPass(password)
      })
    }
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
// console.log(parsePasien[2]);
//
console.log("Welcome to Hacktiv Hospital! \n------------------------");
rl.question("Please enter a username:\n", (username) =>{
  login.cekUName(username)
})
//
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

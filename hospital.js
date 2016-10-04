"use strict"
const readline = require('readline');
const prompt = require('prompt')
var colors = require("colors/safe");
var schema = {
   properties: {
     username: {
       description: 'Please input your username',
       pattern: /^[a-z]+$/,
       message: 'username must be only lowercase letters',
       required: true
     },
     password: {
       description: 'Please input your password',
       hidden: true,
       replace: '*',
       required: true
     }
   }
 };

 var menu = {
    properties: {
      action: {
        pattern: /^[0-9]+$/,
        message: 'Must input action number',
        required: true
      }
    }
  };


class Hospital{
  constructor(property){
    this._staff = []
    this._patient = []
  }
  set staff(value){this._staff = value}
  get staff(){return this._staff}
  set patient(value){this._patient = value}
  get patient(){return this._patient}

  addStaff(value){
    this._staff.push(value)
  }

   welcome(){
    Interface.clearScreen()
    Interface.home()
    Interface.newLines(1)
    console.log(`Please enter your username & password`);
    var usr = []
    var pwd = []
    for(var i=0; i<this._staff.length; i++){
      usr.push(this._staff[i].username)
      pwd.push(this._staff[i].password)
    }
    prompt.get(schema, function (err, result) {
    for(var i=0; i<usr.length; i++){
      if(result.username == usr[i] && result.password == pwd[i]){
        console.log(`Welcome ${result.username} ! Your Access level is Doctor`);
        Interface.showMenu()
      } else {
        console.log(`Not Found !`)
        Interface.home()
      }
    }
  });
  }

  static authentication(){

  }

}

class Staff{
  constructor(property){
    this._name = property['name']
    this._job = property['job']
    this._salary = property['salary']
    this._username = property['username']
    this._password = property['password']
  }
  set name(value){this._name = value}
  get name(){return this._name}
  set job(value){this._job = value}
  get job(){return this._job}
  set salary(value){this._salary = value}
  get salary(){return this._salary}
  set username(value){this._username = value}
  get username(){return this._username}
  set password(value){this._password = value}
  get password(){return this._password}

}

class Patient{
  constructor(property){
    this._name = property['name']
    this._diseases = property['diseases']
  }
}

class Interface{
  static clearScreen(){
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
  }

  static newLines(value){
    for (var i=0; i<value; i++){
      console.log(`\n`);
    }
  }
  static home(){
    console.log(`==========================`);
    console.log(`Welcome to Mangku Hospital`);
    console.log(`==========================`);
  }

  static showMenu(){
    Interface.clearScreen()
    Interface.home()
    console.log(`What would you like to do ? `);
    console.log(`Options : `);
    console.log(`[1] View All Patient`);
    console.log(`[2] Find Record`);
    console.log(`[3] Add Record`);
    console.log(`[4] Remove Record`);
  }

}
var hospital = new Hospital()
var mangku = new Staff({name:'Mangku', job:'Doctor', salary:10000000, username:'mangku', password:'mangku123'})
prompt.message = colors.blue('~>')
hospital.addStaff(mangku)
hospital.welcome()

"use strict"
const readline = require('readline');
const prompt = require('prompt')
var colors = require("colors/safe");
var login = {
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

  var add = {
     properties: {
       _name: {
         description: 'Please input your patient name',
         pattern: /^[a-zA-Z\s]+$/,
         message: 'Please enter a valid name',
         required: true
       },
       _diseases: {
         description: 'Please input your patient diseases',
         pattern: /^[a-zA-Z\s]+$/,
         message: 'Please enter a valid diseases',
         required: true
       }
     }
   };

   var rmv = {
      properties: {
        id_patient: {
          pattern: /^[0-9]+$/,
          message: 'Please input a valid patient id',
          required: true
        }
      }
    };

    var find = {
       properties: {
         id_patient: {
           pattern: /^[0-9]+$/,
           message: 'Please input a valid patient id',
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

  addPatient(value){
    this._patient.push(value)
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
    prompt.get(login, function (err, result) {
    for(var i=0; i<usr.length; i++){
      if(result.username == usr[i] && result.password == pwd[i]){
        Interface.clearScreen()
        Interface.showMenu()
      } else {
        console.log(`Not Found !`)
        Interface.home()
      }
    }
  });
  }

  static view(hospital){
    Interface.clearScreen()
    console.log(`Patient List : `);
    for(var i=0; i<hospital.patient.length; i++){
      console.log(`Patient ID ${i+1} | Name : ${hospital.patient[i]._name} | Diagnose : ${hospital.patient[i]._diseases}`);
    }
  }

  static addPatient(hospital){
    prompt.get(add, function (err, result){

      hospital.patient.push(result)
      Hospital.view(hospital)
      Interface.showMenu()
    })
  }

  static removePatient(hospital){
    console.log(`Input Patient id to remove : `);
    prompt.get(rmv, function (err, result){
      if (parseInt(result.id_patient-1) >= hospital._patient.length) {
        console.log(`Data not found !`);
        Hospital.removePatient(hospital)
      } else {
        var temp = result.id_patient
        hospital.patient.splice(temp-1,1)
        Hospital.view(hospital)
        Interface.showMenu()
      }
    })
  }

  static find(hospital){
    console.log(`Input Patient id to view : `);
    prompt.get(find, function (err, result){
      if (parseInt(result.id_patient-1) >= hospital._patient.length) {
        console.log(`Data not found !`);
        Hospital.find(hospital)
      }else{
        console.log(`================= PATIENT DATA ===============`);
        console.log(`Patient name : ${hospital._patient[result.id_patient-1]._name}`);
        console.log(`Patient diseases : ${hospital._patient[result.id_patient-1]._diseases}`);
        Interface.showMenu()
      }
    })
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

  static doctorMenu(){
    console.log(`==========================`);
    console.log(`Welcome to Mangku Hospital`);
    console.log(`==========================`);
    console.log(`What would you like to do ? `);
    console.log(`Options : `);
    console.log(`[1] View All Patient`);
    console.log(`[2] Find Record`);
    console.log(`[3] Add Record`);
    console.log(`[4] Remove Record`);
    console.log(`[0] Exit Program`);

  }

  static showMenu(){
    Interface.doctorMenu()
    prompt.get(menu, function(err, result){
      switch(result.action){
        case '1' :
          Interface.clearScreen()
          Hospital.view(hospital)
          Interface.showMenu()
          break
        case '2' :
          Hospital.find(hospital)
          break
        case '3' :
          Hospital.addPatient(hospital)
          break
        case '4' :
          Hospital.removePatient(hospital)
          break
        case '0' :
          break
        default :
          Interface.clearScreen()
          console.log(`Action not recognized`);
          Interface.showMenu()
          break
      }
    })
  }

}
var hospital = new Hospital()
var mangku = new Staff({name:'Mangku', job:'Doctor', salary:10000000, username:'mangku', password:'mangku123'})
var toni = new Patient({name:'Toni', diseases:'Pusing'})
prompt.message = colors.blue('~>')
hospital.addStaff(mangku)
hospital.addPatient(toni)
hospital.welcome()

"use strict"

var prompt = require('prompt')
var jsonfile = require('jsonfile')
var file = 'data.json'
var filePatient = 'patient.json'
var data = []
var patient = []

var read = jsonfile.readFileSync(file)
var readPatient = jsonfile.readFileSync(filePatient)

for (var i = 0; i < read.length; i++) {
    data.push(read[i])
}

for(var i = 0; i<readPatient.length; i++) {
    patient.push(readPatient[i])
}



var argv = process.argv

let printHome = (level) => {
    if(level == "admin") {
      console.log("What would you like to do?");
      console.log("Options:");
      console.log("- list_patients");
      console.log("- add_patient <name>");
      console.log("- view_record <patient_id>");
      console.log("- add_record <patient_id> <text record>");
      console.log("- remove_record <patient_id> <text record>");
      console.log("- add_employee <username> <level>");
    }
    else if (level == "doctor") {
      console.log("What would you like to do?");
      console.log("Options:");
      console.log("- list_patients");
      console.log("- add_patient <name>");
      console.log("- view_record <patient_id>");
      console.log("- add_record <patient_id> <text record>");
      console.log("- remove_record <patient_id> <text record>");
    }
    else if (level == "office boy") {
      console.log("===================");
    }
}

let searchIndexPatient = (id) => {
  for(let i = 0 ; i < patient.length ; i++){
    if(String(id) === String(patient[i].id)){
      return i
    }
  }
}

let searchIndexRecordPatient = (id,record_text) => {
  for(let i = 0 ; i < patient.length ; i++){
    if(String(id) === String(patient[i].id)){
      // return i
      for (let j = 0; j < patient[i].record.length; j++) {
        if(String(record_text.toLowerCase()) === String(patient[i].record[j].toLowerCase())) {
          return j
        }
      }
    }
  }
}

let joinName = (inputName) => {
  var name = ""
  for (var i = 1; i < inputName.length; i++) {
    name += inputName[i] + (i < inputName.length-1 ? " " : "")
  }
  return name
}

let joinLevel = (inputName) => {
  var name = ""
  for (var i = 2; i < inputName.length; i++) {
    name += inputName[i] + (i < inputName.length-1 ? " " : "")
  }
  return name
}

let inputAnswer = () => {
  prompt.get(['input'], function(err, result){

    var userInput = result.input.split(" ")
    if(userInput[0] == "list_patients") {
      Patient.showPatient()
    }
    else if(userInput[0] == "add_patient") {
      new Patient(joinName(userInput)).addPatient()
      // console.log(joinName(userInput));
    }
    else if(userInput[0] == "view_record") {
      Patient.showRecord(userInput[1])
    }
    else if (userInput[0] == "add_record") {
      Patient.addPatientRecord(userInput[1], userInput)
    }
    else if (userInput[0] == "remove_record") {
      Patient.removePatientRecord(userInput[1], userInput)
    }
    else if (userInput[0] == "add_employee") {
      // console.log(joinLevel(userInput));
      if (joinLevel(userInput).toLowerCase() === "doctor") {
        data.push(new Doctor(data[data.length-1].id+1, userInput[1], "1234", "doctor"))
        jsonfile.writeFileSync(file, data)
        console.log(`Added employee ${userInput[1]}`);
      }
      else if (joinLevel(userInput).toLowerCase() === "office boy"){
        data.push(new Doctor(data[data.length-1].id+1, userInput[1], "1234", "office boy"))
        jsonfile.writeFileSync(file, data)
        console.log(`Added employee ${userInput[1]}`);
      }
    }
    inputAnswer()
  })
}

prompt.start()

prompt.get(['username', 'password'], function(err, result) {
    // console.log('Command-line input received:');
    // console.log('  username: ' + result.username);
    for (var i = 0; i < read.length; i++) {
        if (result.username == data[i].username && result.password == data[i].password) {
            console.log("--------------------------------------------------------------------");
            console.log(`Welcome, ${result.username}. Your acces level is ${data[i].level}`);
            console.log("--------------------------------------------------------------------");

            printHome(data[i].level)
            inputAnswer()

        }
    }
    // console.log("password atau username salah");
})




class Hospital {
    constructor() {

    }
}

class Patient {
  constructor(nama) {
    this.nama = nama
  }

  addPatient() {
    patient.push({"id": patient[patient.length-1].id+1, "name": this.nama, "record": []})
    jsonfile.writeFileSync(filePatient, patient)
    console.log(`Patien ${this.nama} telah di tambah`);
  }

  static addPatientRecord(id, input) {
    var newRecord = ""
    var index = searchIndexPatient(id)
    for (var i = 2; i < input.length; i++) {
      // console.log(userInput[i]);
      newRecord += input[i] + (i < input.length-1 ? " " : "")
    }
    patient[index].record.push(newRecord)
    jsonfile.writeFileSync(filePatient,patient)
    console.log(`Patient ${patient[index].name} has been added record ${newRecord}`);
  }

  static removePatientRecord(id, input) {
    var deleteRecord = ""
    var index = searchIndexPatient(id)
    for (var i = 2; i < input.length; i++) {
      deleteRecord += input[i] + (i < input.length-1 ? " " : "")
    }
    var indexRecord = searchIndexRecordPatient(id, deleteRecord)
    patient[index].record.splice(indexRecord, 1)
    jsonfile.writeFileSync(filePatient,patient)
    console.log(`Patient ${patient[index].name} has been deleted record ${deleteRecord}`);
  }

  static showRecord(id) {
    for(var i=0;i<patient.length;i++) {
      if(id == patient[i].id) {
        console.log(`${patient[i].id}. ${patient[i].name}, record: ${patient[i].record}`);
      }
    }
  }

  static showPatient() {
    for(var i=0;i<patient.length;i++) {
      console.log(`${patient[i].id}. ${patient[i].name}`);
    }
  }
}

class Employee {
    constructor(id, username, password) {
        this.id = id
        this.username = username
        this.password = password
    }
}

class Doctor extends Employee {
    constructor(id, username, password, level) {
        super(id, username, password)
        this.level = level
    }
}

class OfficeBoy extends Employee {
    constructor(id, username, password, level) {
        super(id, username, password)
        this.level = level
    }
}

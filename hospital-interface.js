"use strict"
let readline = require('readline')

let database = [
  {
    id : "a1",
    username : "admin",
    password : "admin",
    name : "admin kece",
    role : "admin"
  },
  {
    id : "d1",
    username : "doctor1",
    password : "doctor1",
    name : "dr. hebat",
    role : "doctor"
  },
  {
    id: "ob1",
    username : "officeboy1",
    password : "officeboy1",
    name : "ob kece",
    role : "ob"
  }
]

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class Hospitals {
  constructor(name, location, employeeCount, patientCount){
    this.name = name
  }
}

class Patients extends Hospitals {
  constructor(name){
    super(name)
    this.patientList = []
  }

  addPatient(newPatient){
    // console.log(newPatient);
    this.patientList.push(newPatient)
    console.log(`New Patient Has Been Added to Database`);
    // console.log(this.patientList);
  }

  printListPatients(){
    if(this.patientList.length === 0){
      console.log(`There's no Patient in this Hospital `);
    }else{
      console.log(`Patients List :`);
      console.log(`-----------------------------------`);
      console.log(`ID - Nama - Penyakit}`);
      // console.log(this.patientList);
      for(var i = 0 ; i < this.patientList.length ; i++){
        console.log(this.patientList[i].id + " - " +
        this.patientList[i].name+ " - " +
        this.patientList[i].penyakit);
      }
    }
  }

  searchIndexByID(id){
    for(var i = 0 ; i < this.patientList.length ; i++){
      if(String(this.patientList[i].id) === id){
        return i
      }
    }
  }

  viewRecordsPatients(index){
    if(this.patientList.length === 0){
      console.log(`There's no Patient in this Hospital `);
    }else{
      if(this.patientList[index].record.length === 0){
        console.log(`There's no record yet !`);
      }else{
        console.log(`Patient's Records :`);
        console.log(`-----------------------------------`);
        console.log(`Record ID - Record Content`);
        console.log(`-----------------------------------`);
        // console.log(this.patientList[index]);
        for(var i = 0 ; i < this.patientList[index].record.length ; i++ ){
          console.log(this.patientList[index].record[i].id + "    - " + this.patientList[index].record[i].progress);
        }
      }
    }
  }

  getID(cek, index){
    if(cek === "pasien" && typeof index === "undefined"){
      if(this.patientList.length === 0){
        return 0
      }else{
        return this.patientList[this.patientList.length-1].id
      }
    }else if(cek === "record" && index >= 0){
      if(this.patientList[index].record.length === 0){
        return 0
      }else{
        let record_simple = this.patientList[index].record
        return record_simple[record_simple.length-1].id
      }
    }
  }

  addRecordsPatients(index, newData){
    this.patientList[index].record.push(newData)
    console.log(`New Record Has Been Added`);
  }

  removeRecordsPatients(index, indexRecord){
    if(this.patientList.length === 0){
      console.log(`There's no Patient in this Hospital `);
    }else{
      if(this.patientList[index].record.length === 0){
        console.log(`There's no record yet !`);
      }else{
        // console.log(this.patientList[index].record[indexRecord]);
        if(typeof this.patientList[index].record[indexRecord] === "undefined"){
          console.log(`ID Record Not Found !`);
        }else{
          this.patientList[index].record.splice(indexRecord, 1)
          console.log(`You have remove record index ke ${indexRecord}`);
        }
      }
    }
  }
}

class Employees extends Hospitals {
  constructor(type){

  }
}


rl.prompt()
let newHospital = new Hospitals("Blanford")
console.log(`Welcome to ${newHospital.name} Hospital`)
console.log(`-----------------------------------`);

let loginPass = (usernameAnswer) => {
  rl.question('Please Enter Your Password : ', (passwordAnswer) => {
    if(passwordAnswer != '' && searchToDatabase(passwordAnswer, usernameAnswer) === true){
      let pasien = new Patients()
      askAdmin(pasien)
    }else{
      loginPass(usernameAnswer)
    }
  })
}

let loginUser = () => {
  rl.question('Please Enter Your Username : ', (usernameAnswer) => {
    if(usernameAnswer != '' && searchToDatabase(usernameAnswer, 'user') === true ){
      loginPass(usernameAnswer)
    }else{
      loginUser()
    }
  })
}

let searchToDatabase = (input, type) => {
  let flag = 0
  for(var i = 0 ; i < database.length ; i++){
    if(type === 'user'){
      if(database[i].username === input){
        flag++
      }else{
        flag += 0
      }
    }else{
        if(database[i].username === type){
          if(database[i].password === input){
            flag++
            console.log(`-----------------------------------`);
            console.log(`Welcome, ${database[i].name}.\nYour Access Level is : ${database[i].role}`);
            console.log(`-----------------------------------`);
            printMenu(database[i].role)
          }
        }else{
          flag += 0
        }
    }
  }
  return flag > 0 ? true : false
}

let printMenu = (role) => {
  if(role === "doctor"){
    console.log(`What would you like to do?`)
    console.log(`Options :`)
    console.log(`- add_patient`);
    console.log(`- list_patients`)
    console.log(`- view_records <patient_id>`)
    console.log(`- add_record <patient_id>`)
    console.log(`- remove_record <patient_id> <record_id>`)
    console.log(`- type sign out to close`);
  }
}

let askAdmin = (pasien) => {
  rl.question('\nType Your Option :', (input) => {
    let index = 0
    if(input === 'add_patient'){
      rl.question('name:', (pasien_name) => {
        rl.question('penyakit:', (pasien_penyakit) => {
          // console.log(pasien.getID()+1);
          pasien.addPatient({
            id : pasien.getID("pasien")+1,
            name : pasien_name,
            penyakit : pasien_penyakit,
            record : []
          })
          askAdmin(pasien)
        })
      })
    }else if(input === 'list_patients'){
      pasien.printListPatients()
      askAdmin(pasien)
    }else if(/^view_records \d/.test(input)){
      input = input.split(" ")
      // console.log(input[1]);
      index = pasien.searchIndexByID(input[1])
      // console.log(id);
      pasien.viewRecordsPatients(index)
      askAdmin(pasien)
    }else if(/^add_record \d/.test(input)){
      input = input.split(" ")
      index = pasien.searchIndexByID(input[1])

      if(pasien.patientList.length === 0){
        console.log(`There's no Patient in this Hospital `);
      }else{
        rl.question('progress:', (progress) => {
          let newData = {
            id : pasien.getID('record', index)+1,
            progress : progress
          }
          // console.log(newData);
          pasien.addRecordsPatients(index, newData)
          askAdmin(pasien)
        })
      }
      askAdmin(pasien)
    }else if(/^remove_record \d \d/.test(input)){
      input = input.split(" ")
      index = pasien.searchIndexByID(input[1])
      pasien.removeRecordsPatients(index, input[2]-1)
      askAdmin(pasien)
    }else if(input === "sign out"){
      rl.close()
    }else{
      console.log(`Input Based on Options !`);
      askAdmin(pasien)
    }

  });
}



loginUser()

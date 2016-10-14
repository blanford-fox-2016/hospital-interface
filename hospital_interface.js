"use strict"

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fs = require('fs');
var data = fs.readFileSync('data.json');
var parseData = JSON.parse(data);

class Interface{
  constructor(){
    this.user = [];
    this.pass = [];
    this.cmd = []
    this.perintah = this.cmd.join("")
  }

  login(){
    rl.prompt()
    rl.question('Please enter your username: ', (username) => {
      rl.question('Please enter your password: ', (password) => {
        this.user.push(`${username}`);
        this.pass.push(`${password}`);
          if (parseData[0]['user'] == username && parseData[0]['password'] == password){
            this.home();
            this.option();
          } else {
            rl.close()
          }
      });
    });
  }

  welcome(){
    console.log(`Selamat Datang di Rumah Sakit`);
    console.log("-----------------------------------");
  }

  home(){
    console.log("-----------------------------------");
    console.log(`Selamat datang, ${this.user[0]}. Your access level is Admin`);
    console.log("-----------------------------------");
  }

  option(){
    rl.question(`Apa yang ingin anda lakukan?\n Options:\n -list_patients\n -view_records <patient_id\n -add_record <patient_id \n remove_record <patient_id><record_id>\n`, (input) =>{
      var perintah = input.split(" ");
      this.perintah();
    })
  }

  perintah(){
    console.log("input");
  }
}


class Hospital{
  constructor(){
    this.nama = nama;
    this.alamat = alamat;
    this.jml_pasien = jml_pasien;
    this.jml_karyawan = jml_karyawan
  }
}

class Person {
  constructor() {
    this.nama = nama;
    this.username = username;
    this.password =  password
    this.birthdate = birthdate;
    this.accessLevel = accessLevel;
  }
}

class Pasien extends Person{
  constructor(nama, username, password, birthdate, accessLevel){
    super(nama, username, password, birthdate, accessLevel)
    this.penyakit = penyakit;
  }
}

class Karyawan extends Person{
  constructor(nama, username, password, birthdate, accessLevel){
    super(nama, username, password, birthdate, accessLevel)
    this.role = role;
  }
}

var muka = new Interface()
muka.welcome()
muka.login()

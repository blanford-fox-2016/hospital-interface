"use strict"

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

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
    console.log(`Selamat datang, ${this.user[0]}. Your access level is Dokter`);
    console.log("-----------------------------------");
  }

  option(){
    rl.question(`Apa yang ingin anda lakukan?\n Options:\n -list_patients\n -view_records <patient_id\n -add_record <patient_id \n remove_record <patient_id><record_id>\n`, (input) =>{
      var doso = input.split(" ");
      this.perintah(doso);
    })
  }
  //masih nyangkut disini untuk readlinenya
  perintah(doso){
    console.log("input");
  }
}


class Hospital{
  constructor(nama){
    this.nama = nama;
    this.alamat = alamat;
    this.jml_pasien = jml_pasien;
    this.jml_karyawan = jml_karyawan
  }
}

class Person {
  constructor(id, nama, username, password, birthdate) {
    this.id = id;
    this.nama = nama;
    this.username = username;
    this.password =  password
    this.birthdate = birthdate;
    this.accessLevel = 0;
  }
}

class Pasien extends Person{
  constructor(id, nama, birthdate, penyakit){
    super(nama, birthdate)
    this.penyakit = penyakit;
  }
}

class Karyawan extends Person{
  constructor(id, nama, username, password, birthdate){
    super(id, nama, username, password, birthdate)
    this.accessLevel = 1
  }
}

class Admin extends Karyawan{
  constructor(id, nama, username, password, birthdate){
    super(id, nama, username, password, birthdate)
    this.accessLevel = 3;
  }
  add_person(person, id, nama, username, password, birthdate){
    var baru = new Karyawan(id, nama, username, password, birthdate)
  }

  add_dokter(id, nama, username, password, birthdate){
    var baru = new Dokter(id, nama, username, password, birthdate)
  }

  add_pasien(id, nama, username, password, birthdate){
    var baru = new Pasien(id, nama, username, password, birthdate)
  }
}

class Dokter extends Karyawan{
  constructor(id, nama, username, password, birthdate){
    super(id, nama, username, password, birthdate)
    this.accessLevel = 2
  }
  list_patients(){

  }
  view_records(patient_id){

  }
  add_record(patient_id){

  }
  remove_record(patient_id, record_id){

  }
}

var muka = new Interface()
var saya = new Dokter(1, "Syanmil", "test", "rahasia", "17/08/1990")
console.log(saya["nama"]);
// muka.welcome()
// muka.login()

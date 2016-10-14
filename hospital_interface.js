"use strict"

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const fs = require('fs');
var data = fs.readFileSync('data.json');
var parseData = JSON.parse(data);
var insider = fs.readFileSync('databaseRS.json')
var parseDatabaseRS = JSON.parse(insider);
var pasien = fs.readFileSync('DataKorban.json')
var pasienkita = JSON.parse(pasien)
var allOfUs = parseDatabaseRS

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
    this.id = allOfUs[allOfUs.length-1].id +1 || 1;
    this.nama = nama;
    this.username = username;
    this.password =  password
    this.birthdate = birthdate;
    this.accessLevel = 0;
  }
}

class Pasien{
  constructor(id, nama, birthdate, penyakit){
    this.id = pasienkita[pasienkita.length-1].id +1 || 1;
    this.nama = nama;
    this.birthdate = birthdate;
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
  add_karyawan(id, nama, username, password, birthdate){
    var baru = new Karyawan(id, nama, username, password, birthdate)
    allOfUs.push(baru)
    var write = JSON.stringify(allOfUs);
    fs.writeFileSync('databaseRS.json', write)
  }

  add_dokter(id, nama, username, password, birthdate){
    var baru = new Dokter(id, nama, username, password, birthdate)
    allOfUs.push(baru)
    var write = JSON.stringify(allOfUs);
    fs.writeFileSync('databaseRS.json', write)
  }

  add_pasien(id, nama, birthdate, penyakit){
    var baru = new Pasien(id, nama, birthdate, penyakit)
    pasienkita.push(baru)
    var write = JSON.stringify(pasienkita);
    fs.writeFileSync('DataKorban.json', write)
  }
}

class Dokter extends Karyawan{
  constructor(id, nama, username, password, birthdate){
    super(id, nama, username, password, birthdate)
    this.accessLevel = 2
  }
  list_patients(){
    for (var i = 0; i<pasienkita.length; i++){
      console.log(pasienkita[i]);
    }
  }
  view_records(patient_id){

  }
  add_record(patient_id){

  }
  remove_record(patient_id, record_id){

  }
}

var muka = new Interface()
var saya = new Dokter()
var hacker = new Admin()
saya.list_patients()
// hacker.add_dokter(1,"Syanmil","master","dokter","masih muda pokoknya")
hacker.add_pasien(0,"tamaboy", "fifteen years ago", "flu ringan")
// console.log(pasienkita);
// muka.welcome()
// muka.login()

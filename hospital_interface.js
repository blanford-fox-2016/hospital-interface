"use strict"

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Interface{
  constructor(){
    this.user = [];
    this.pass = [];
  }

  login(){
    rl.prompt()
    var user = [];
    var pass = [];
    rl.question('Please enter your username: ', (username) => {
      rl.question('Please enter your password: ', (password) => {
        this.user.push(`${username}`);
        this.pass.push(`${password}`);
        if () {
          this.home()
        }
        rl.close()
      });
    });

  }

  welcome(){
    console.log(`Selamat Datang di Rumah Sakit`);
    console.log("-----------------------------------");
  }

  home(){
    console.log("-----------------------------------");
    console.log(`Selamat datang, ${this.user[0]}. Your access level is Doctor`);
    console.log("-----------------------------------");
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
    this.birthdate = birthdate;
    this.accessLevel = accessLevel;
  }
}

class Pasien extends Person{
  constructor(nama, birthdate, accessLevel){
    super(nama, birthdate, accessLevel)
    this.penyakit = penyakit;
  }
}

class Karyawan extends Person{
  constructor(nama, birthdate, accessLevel){
    super(nama, birthdate, accessLevel)
    this.role = role;
  }
}

var muka = new Interface()
muka.welcome()
muka.login()

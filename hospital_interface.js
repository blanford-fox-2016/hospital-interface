"use strict"

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fs = require('fs');
var insider = fs.readFileSync('databaseRS.json')
var allOfUs = JSON.parse(insider);
var pasien = fs.readFileSync('DataKorban.json')
var pasienkita = JSON.parse(pasien)

class Interface{
  constructor(){
    this.user = [];
    this.pass = [];
    this.cmd = [];
    this.active = 0;
    this.perintah = this.cmd.join("");
  }

  login(){
    rl.prompt()
    rl.question('Please enter your username: ', (username) => {
      rl.question('Please enter your password: ', (password) => {
        this.user.push(`${username}`);
        this.pass.push(`${password}`);
        if (this.cek() === true){
          this.home();
          this.option();
        } else {
          console.log("password atau username salah");
          rl.close()
        }
      });
    });
  };
  cek(){
    for (var i = 0; i <allOfUs.length; i++){
      if (allOfUs[i].username === this.user[0]){
        if (allOfUs[i].password === this.pass[0]){
          this.active += i
          return true
        }
      }
    }
    return false
  };

  welcome(){
    console.log(`Selamat Datang di Rumah Sakit`);
    console.log("-----------------------------------");
  };

  home(){
    console.log("-----------------------------------");
    console.log(`Selamat datang, ${allOfUs[this.active].nama}. Your access level is ${allOfUs[this.active].accessLevel}`);
    console.log("-----------------------------------");
  };

  option(){
    if (allOfUs[this.active].accessLevel === 2){
      console.log(`Apa yang ingin anda lakukan?\n Options:\n 1 -- list_patients\n 2 -- view_records <patient_id>\n 3 -- add_record <patient_id> \n 4 -- remove_record <patient_id><record_id>\n`)
    } else if(allOfUs[this.active].accessLevel === 3){
      console.log(`Apa yang ingin anda lakukan?\n Options:\n 1 -- list_karyawan\n 2 -- tambah_karyawan\n 3 -- pecat_karyawan\n 4 -- tambah_pasien\n`)
    };
  this.test();
  }
  //masih nyangkut disini untuk readlinenya
  test(){
    if (allOfUs[this.active].accessLevel === 2){
      rl.question("pilih angka perintah yang digunakan : ", (cmd) =>{
        cmd = cmd.split(" ");
        switch (cmd[0]) {
          case "1":
            saya.list_patients()
            rl.close()
            break;
          case "2":
              saya.view_records(cmd[1])
              rl.close()
            break;
          case "3":
              saya.add_record(cmd[1])
              rl.close()
            break;
          case "4":
              saya.remove_record(cmd[1], cmd[2])
              rl.close()
            break;
          default:
            rl.close()
        }
      });
    } else if (allOfUs[this.active].accessLevel === 3){
      rl.question("pilih angka perintah yang digunakan : ", (cmd) =>{
        switch (cmd) {
          case "2":
            hacker.add_karyawan()
            break;
          default:
            rl.close()

        }
      });
    } else {
      rl.close
    }
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
  constructor(id, nama, birthdate, penyakit, record){
    this.id = pasienkita[pasienkita.length-1].id +1 || 1;
    this.nama = nama;
    this.birthdate = birthdate;
    this.penyakit = penyakit;
    this.record = []
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
      console.log(`id ${pasienkita[i].id} || ${pasienkita[i].nama}`);
    }
  }
  view_records(patient_id){
    console.log(`Daftar riwayat penyakit ${pasienkita[patient_id-1].nama} adalah ${pasienkita[patient_id-1].penyakit}`);
    console.log(`daftar periksa :\n ${pasienkita[patient_id-1].record}`);
  }
  add_record(patient_id){
    var date = new Date()
    date.toDateString()
    var add = pasienkita[patient_id-1]['record']
    add.push(date);
    var write = JSON.stringify(pasienkita);
    fs.writeFileSync('DataKorban.json', write)
    this.view_records(patient_id);
  }
  remove_record(patient_id, record_id){
    pasienkita[patient_id-1]['record'].splice(record_id,1)
  }
}

var muka = new Interface()
var saya = new Dokter()
var hacker = new Admin()
// saya.list_patients()
// saya.add_record(2)
// saya.view_records(1)
// saya.remove_record(2,0)
// hacker.add_dokter(1,"Syanmil","master","dokter","masih muda pokoknya")
// hacker.add_pasien(0,"borjeus", "beyond history", ["immortality", "undead"])
// console.log(pasienkita);
muka.welcome()
muka.login()

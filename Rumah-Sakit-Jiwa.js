'use strict'
const readline = require('readline');
class  Rumah_Sakit_Jiwa{
  constructor(data) {
    this._nama_hospital = data['nama_hospital']
    this._lokasi_hospital = data['lokasi_hospital']
    this._jumlah_karyawan = data['jumlah_karyawan']
    this._jumlah_pasien = data['jumlah_pasien']
  }
  set nama_hospital(nama_hospital){this._nama_hospital = nama_hospital}
  get nama_hospital(){return this._nama_hospital}
  set lokasi_hospital(lokasi_hospital){this._lokasi_hospital = lokasi_hospital}
  get lokasi_hospital(){return this._lokasi_hospital}
  set jumlah_karyawan(jumlah_karyawan){this._jumlah_karyawan = jumlah_karyawan}
  get jumlah_karyawan(){return this._jumlah_karyawan}
  set jumlah_pasien(jumlah_pasien){this._jumlah_pasien = jumlah_pasien}
  get jumlah_pasien(){return this._jumlah_pasien}
}

class Pasien_Sakit_Jiwa{
  constructor(data) {
    this._id_pasien = data['id_pasien']
    this._diagnosis = data['diagnosis']
  }
  set id_pasien(id_pasien){this._id_pasien = id_pasien}
  get id_pasien(){return this._id_pasien}
  set diagnosis(diagnosis){this._diagnosis = diagnosis}
  get diagnosis(){return this._diagnosis}
}

class Karyawan_Sakit_Jiwa{
  constructor(data) {
    this._karyawan_roles = data['karyawan_roles']
    this._id_karyawan = data['id_karyawan']
  }
  set karyawan_roles(karyawan_roles){this._karyawan_roles = karyawan_roles}
  get karyawan_roles(){return this._karyawan_roles}
  set id_karyawan(id_karyawan){this._id_karyawan = id_karyawan}
  get id_karyawan(){return this._id_karyawan}
}

var tampung_pasien = []
var tampung_diagnosis = []
class Dokter extends Karyawan_Sakit_Jiwa{
  constructor(data) {
    super(data)
  }
  list_patients()
  {
    if(tampung_pasien.length == 0)
    console.log('No pasien found!')
    else if(tampung_pasien.length !=0)
    console.log(tampung_pasien)
  }
  view_records()
  {
    if(tampung_diagnosis.length == 0)
    console.log('No records found!')
    else if(tampung_diagnosis.length > 0)
    console.log(tampung_diagnosis)
  }
  add_records(diagnosis)
  {
    return tampung_diagnosis.push(diagnosis)
  }
  remove_record()
  {
    if(tampung_diagnosis.length == 0)
    console.log("No records found!")
    else if(tampung_diagnosis.length != 0)
    return tampung_diagnosis.pop()
  }
}

class Receptionist extends Karyawan_Sakit_Jiwa {
  constructor(data) {
    super(data)
  }
  add_patients(pasien)
  {
    tampung_pasien.push(pasien)
  }
  add_diagnosis(diagnosis)
  {
    tampung_diagnosis.push(diagnosis)
  }

}

class Office_Boy extends Karyawan_Sakit_Jiwa{
  constructor(data)
  {
    super(data)
  }
}

var rumah_sakit = {
  nama_hospital:'Rumah Sakit Jiwa',
  lokasi_hospital:'Kebayoran Lama, Jl.Kebon Mangga No.3E',
  jumlah_karyawan:200,//person
  jumlah_pasien:1000//person
}

var dokter = {
  karyawan_roles:'Dokter',
  id_karyawan:112
}
var receptionist = {
  karyawan_roles:'Receptionist',
  id_karyawan:113
}
var office_boy = {
  karyawan_roles:'Office Boy',
  id_karyawan:114
}
var pasiens = {
  id_pasien: random_id_pasien(),
  diagnosis:random_diagnosis()
}

function random_diagnosis()
{
  switch (Math.floor(Math.random()*5)+1) {
    case 1:
      return 'sakit jiwa'
    break;
    case 2:
      return 'sakit hati'
    break;
    case 3:
      return 'gagal jantung'
    break;
    case 4:
      return 'tumor gila'
    break;
    case 5:
      return 'kusta gila'
    break;
    default:
      return false
      break
  }
}

function random_id_pasien()
{
  return Math.floor(Math.random()*50)+1
}

function random_roles()
{
  return Math.floor(Math.random()*3)+0
}

var rumah_sakit = new Rumah_Sakit_Jiwa(rumah_sakit)
var pasiens = new Pasien_Sakit_Jiwa(pasiens)
var dokter = new Dokter(dokter)
var karyawans = new Karyawan_Sakit_Jiwa(dokter)


console.log('=============== Welcome to Rumah Sakit Jiwa Mistic =============\n');
console.log('=================================================================\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


var username = []
var password = []
var choice = []
rl.setPrompt("Please enter your username: ")
rl.prompt();
rl.setPrompt('Please enter your password:')
rl.on('line', (line) => {
if(username.length === 0){
  username[username.length] = line.trim()
  rl.prompt()
}
else if(password.length === 0)
{
  password[password.length] = line.trim()
  console.log('---------------------------\n');
  console.log(`Welcome, ${username[0]}. Your access level is : ${karyawans.karyawan_roles}\n`);
  console.log('----------------------------\n');
  console.log('What would you like to do?');
  console.log('1. list_patients');
  console.log('2. view_records <patient_id>');
  console.log('3. add_records <patient_id>');
  console.log('4. remove_record <patient_id> <record_id>');
  console.log('5. exit');
  rl.setPrompt('Please enter your choice based on number : \n')
  rl.prompt()
}else if(choice.length === 0)
{
  choice[choice.length] = line.trim()
  switch (line.trim()) {
    case '1':
    dokter.list_patients()
    break;
    case '2':
    dokter.view_records()
    break;
    case '3':
    dokter.add_records(pasiens)
    break;
    case '4':
    dokter.remove_record();
    break
    case '5':
    process.exit(0)
    break
    default:
  }
}

}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});

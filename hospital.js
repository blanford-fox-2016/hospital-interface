 "use strict"
var prompt = require('prompt');
var readline = require('readline')
//data karyawan
var dataKaryawan = [{username:"aji",password:"lantang",jabatan:'dokter'},
{username:"tama",password:"tamaaja",jabatan:'officeboy'}]
//data pasien(catatan:record array jika dimasukan data record baru tinggal push)
var dataPasien = [{username:"laksana",password:"lantang",record:[{guladarah:100,golonganDarah:"O",takananDarah:100,penyakit:"paru-paru",checkup:1}]}]
class Hospital {
  constructor(parameter) {
    this.nama = parameter['nama'];
    this.jabatan = parameter['jabatan'];
    this.password = parameter['password'];
  }
}

class Karyawan extends Hospital{
  constructor(parameter,data) {
    super(parameter)
    this.data = dataKaryawan
    this.dataPasien = dataPasien
  }
  //viewRecordpatient
  viewRecord(){
    this.dataPasien.map(function(obj){
      console.log(`nama: ${obj.username}\nrecord :\ngula darah ${(obj.record[0].guladarah)}\ngolongan Darah ${(obj.record[0].golonganDarah)}\ntekanan Darah ${(obj.record[0].takananDarah)}\npenyakit  ${(obj.record[0].penyakit)}\ncheckup: ${(obj.record[0].checkup)}`);
    })
  }//addRecord nama

  addRecord(nama,guladar,golonganDar,tekananDar,sakit,check){
    this.dataPasien.push({username:nama,password:"",record:[{guladarah:guladar,golonganDarah:golonganDar,takananDarah:tekananDar,penyakit:sakit,checkup:check}]})
  }
  //update data patient
  updateRecord(nama,guladar,golonganDar,tekananDar,sakit,check){
    var index = this.dataPasien.map(function(el) { return el.username; }).indexOf(nama);
    this.dataPasien[index] = {username:nama,password:"",record:[{guladarah:guladar,golonganDarah:golonganDar,takananDarah:tekananDar,penyakit:sakit,checkup:check}]}
  }
  //removeData
  removeData(nama){
    var index = this.dataPasien.map(function(el) { return el.username; }).indexOf(nama);
    this.dataPasien.splice(index,1)
  }
  //record personal (name)
 recordpasien(nama){
    var index = this.dataPasien.map(function(el) { return el.username; }).indexOf(nama);
    var obj = dataPasien[index]
    console.log(`nama: ${obj.username}\nrecord :\ngula darah ${(obj.record[0].guladarah)}\ngolongan Darah ${(obj.record[0].golonganDarah)}\ntekanan Darah ${(obj.record[0].takananDarah)}\npenyakit  ${(obj.record[0].penyakit)}\ncheckup: ${(obj.record[0].checkup)}`)
  }
}

  //cek akun pasien
  function cekPasien(username,password){
    for (var i = 0; i < dataPasien.length; i++) {
      if (username === dataPasien[i].username && password === dataPasien[i].password) {
        return "pasien"
      }else {
        return "orang luar"
      }
    }
  }
  //function cek akun
  function cekAkun(username,password){
    for (var i = 0; i < dataKaryawan.length; i++) {
      // console.log(dataKaryawan.username );
        if (username === dataKaryawan[i].username && password === dataKaryawan[i].password && "dokter"===dataKaryawan[i].jabatan) {
          console.log(`akses anda sebagai ${dataKaryawan[i].jabatan}`);
          return "dokter"
        }else if (dataKaryawan[i].username === username && dataKaryawan[i].password === password ) {
          console.log(`akses anda sebagai ${dataKaryawan[i].jabatan}`);
          return "karyawan biasa"
       }
    }
    return cekPasien(username,password)
}
//tampilan untuk akses dokter
function tampilan(nama){
  console.log(`apa yang ingin anda lakukan dokter ${nama}, pilih hanya dengan mengetikkan angka` )
  console.log(`1.tampilkan record semua pasien`);
  console.log(`2.tambahkan pasien dengan record`);
  console.log(`3.busek/hapus record pasien`);
  console.log(`4.ubah record pasien `);
  console.log(`5.record pasien dengan nama`);
}
//inisiasi new objek
var coba = new Hospital({})
var test = new Karyawan({})

//perintah dokter
function perintahDokter(angka){
  switch (Number(angka)) {
    case 1:
    test.viewRecord()
    run()
      break;
    case 2:
    prompt.get(['nama','guladar','golonganDar','tekananDar','sakit','check'], function (err, result) {
    test.addRecord(result.nama,result.guladar,result.golonganDar,result.tekananDar,result.sakit,result.check)
    run()
    })
      break;
    case 3:
      prompt.get(['nama_pasien'], function (err, result) {
      test.removeData(result.nama_pasien)
      run()
      })
      break;
    case 4:
      prompt.get(['nama','guladar','golonganDar','tekananDar','sakit','check'], function (err, result) {
      test.updateRecord(result.nama,result.guladar,result.golonganDar,result.tekananDar,result.sakit,result.check)
      run()
      })
     break;
     case 5:
       prompt.get(['user_nama'], function (err, result) {
       test.recordpasien(result.user_nama)
       run()
       })
      break;

    default:
  }
}
//view program
console.log("------------selamat datang-----------------");
console.log("-------------rumah sakit ecma--------------");
function run(){
  prompt.start();
    // Get two properties from the user: username and password
    prompt.get(['username', 'password'], function (err, result) {
        switch (cekAkun(result.username,result.password)) {
          case "dokter":
            tampilan(result.username)
            prompt.get(['angka'], function (err, result) {
              perintahDokter(result.angka)
            })
            break;
          case "karyawan biasa":
            console.log(`maaf anda hanya karyawan biasa sementara belum ada menu yang bisa anda akses ${result.username}`);
            break;
          case "pasien":
            let nama = result.username
            console.log(`selamat datang di cyber rumah sakit kami : ${result.username}\nberikut merupakan record anda`);
            test.recordpasien(result.username)
            run()
            break;
          case "orang luar":
            console.log("username atau password salah");
            run()
            break;
          default:
        }
        });// console.log('what do you want to do');
        // console.log('');
  }
  //function to run program
  run()

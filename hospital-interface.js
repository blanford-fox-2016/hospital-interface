class Hospital{
  constructor(nama, lokasi, jmlKry, jmlPas){
    this._namaRumahSakit = nama
    this._lokasi = lokasi
    this._jumlah_karyawan = jmlKry
    this._jumlah_pasien = jmlPas
  }


}

class Employees{
  constructor(nama, alasan){
    this._namapasien = nama
    this._alasan = alasan
  }
}

class Patiens{
  constructor(username, password, nama, jabatan){
    this._userName = username
    this._userPassword = password
    this._namakaryawan = nama
    this._jabatan = jabatan
  }
}

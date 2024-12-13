const express = require('express');
const app = express();

// Gunakan array sederhana untuk menyimpan data
const jadwalKuliah = [
  {
    hari: 1, // Senin
    mataKuliah: 'PLC',
    jamMulai: '13:00',
    jamSelesai: '15:00'
  },
  {
    hari: 2, // Selasa
    mataKuliah: 'Mikroprosessor',
    jamMulai: '14:05',
    jamSelesai: '14:55'
  }
];

const kartuMahasiswa = [
  {
    cardId: '36450a87',
    nama: 'Xavier',
    nim: '12345'
  },
  {
    cardId: '4379ad30',
    nama: 'Molla',
    nim: '67890'
  }
];

const absensi = [];

app.use(express.urlencoded({ extended: true }));

app.post('/attendance', (req, res) => {
  const { card_id, time } = req.body;
  const [jam, menit] = time.split(':');
  const waktuScan = `${jam}:${menit}`;
  
  // Dapatkan hari ini (0 = Minggu, 1 = Senin, dst)
  const hariIni = new Date().getDay();
  
  // Cari jadwal hari ini
  const jadwalHariIni = jadwalKuliah.find(jadwal => jadwal.hari === hariIni);
  
  if (!jadwalHariIni) {
    return res.json({
      status: 'error',
      message: 'Tidak ada jadwal kuliah hari ini'
    });
  }
  
  // Cari data mahasiswa
  const mahasiswa = kartuMahasiswa.find(m => m.cardId === card_id);
  
  if (!mahasiswa) {
    return res.json({
      status: 'error',
      message: 'Kartu tidak terdaftar'
    });
  }
  
  // Cek waktu kedatangan
  const jamMulai = jadwalHariIni.jamMulai.split(':')[0];
  const menitMulai = jadwalHariIni.jamMulai.split(':')[1];
  
  let status;
  if (parseInt(jam) < parseInt(jamMulai) || 
      (parseInt(jam) === parseInt(jamMulai) && parseInt(menit) <= parseInt(menitMulai))) {
    status = 'HADIR';
  } else if (parseInt(jam) === parseInt(jamMulai) && 
             parseInt(menit) <= parseInt(menitMulai) + 15) {
    status = 'TERLAMBAT';
  } else {
    status = 'TIDAK HADIR';
  }
  
  // Simpan absensi
  const dataAbsensi = {
    waktu: waktuScan,
    mahasiswa: mahasiswa.nama,
    nim: mahasiswa.nim,
    mataKuliah: jadwalHariIni.mataKuliah,
    status: status
  };
  
  absensi.push(dataAbsensi);
  
  // Kirim response
  res.json({
    status: 'success',
    message: `Absensi berhasil: ${mahasiswa.nama} - ${status}`,
    data: dataAbsensi
  });
});

// Endpoint untuk melihat semua data absensi
app.get('/attendance', (req, res) => {
  res.json(absensi);
});

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
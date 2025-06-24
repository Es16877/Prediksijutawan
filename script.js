// ==================== KONFIGURASI ====================
const Config = {
  PASARAN: [
    "BANGKOK 0130", "BANGKOK 0930", "BRUNEI 02", "BRUNEI 14", "BRUNEI 21",
    "BULLSEYE", "CALIFORNIA", "CAROLINA EVENING", "CHELSEA 11", "CHELSEA 15",
    "CHELSEA 19", "CHELSEA 21", "FLORIDA EVENING", "FLORIDA MIDDAY", "HOKIDRAW",
    "HONGKONG", "HUAHIN 0100", "HUAHIN 1630", "HUAHIN 2100", "JAKARTA 1400",
    "JAKARTA 2330", "KENTUCKY EVENING", "KENTUCKY MIDDAY", "KINGKONG 4D MALAM",
    "KINGKONG 4D SORE", "MAGNUM4D", "NEVADA", "NEW YORK EVENING", "NEW YORK MIDDAY",
    "NORTH CAROLINA DAY", "OREGON 03", "OREGON 06", "OREGON 09", "OREGON 12",
    "PCSO", "POIPET 12", "POIPET 15", "POIPET 19", "POIPET 22", "SINGAPORE",
    "SYDNEY", "TOTO CAMBODIA", "TOTO MACAU 5D MALAM", "TOTO MACAU 5D SORE",
    "TOTO MACAU MALAM I", "TOTO MACAU MALAM II", "TOTO MACAU MALAM III",
    "TOTO MACAU PAGI", "TOTO MACAU SIANG", "TOTO MACAU SORE", "TOTO MALI 1530",
    "TOTO MALI 2030", "TOTO MALI 2330"
  ],
  SHIO: [
    "Tikus", "Kerbau", "Macan", "Kelinci", "Naga",
    "Ular", "Kuda", "Kambing", "Monyet", "Ayam",
    "Anjing", "Babi"
  ],
  URUTAN_PASARAN: [
    "TOTO MACAU PAGI", "KENTUCKY MIDDAY", "FLORIDA MIDDAY", "HUAHIN 0100",
    "BANGKOK 0130", "NEW YORK MIDDAY", "NORTH CAROLINA DAY", "BRUNEI 02",
    "OREGON 03", "OREGON 06", "CALIFORNIA", "FLORIDA EVENING", "OREGON 09",
    "BANGKOK 0930", "NEW YORK EVENING", "KENTUCKY EVENING", "CAROLINA EVENING",
    "TOTO CAMBODIA", "CHELSEA 11", "OREGON 12", "BULLSEYE", "POIPET 12",
    "TOTO MACAU SIANG", "SYDNEY", "JAKARTA 1400", "BRUNEI 14", "CHELSEA 15",
    "TOTO MACAU 5D SORE", "POIPET 15", "TOTO MALI 1530", "TOTO MACAU SORE",
    "HUAHIN 1630", "KINGKONG 4D SORE", "SINGAPORE", "MAGNUM4D", "CHELSEA 19",
    "TOTO MACAU MALAM I", "POIPET 19", "PCSO", "TOTO MALI 2030", "HUAHIN 2100",
    "CHELSEA 21", "TOTO MACAU 5D MALAM", "NEVADA", "BRUNEI 21", "TOTO MACAU MALAM II",
    "POIPET 22", "HONGKONG", "TOTO MACAU MALAM III", "TOTO MALI 2330", "JAKARTA 2330",
    "KINGKONG 4D MALAM", "HOKIDRAW"
  ],
  GENERATOR: {
    FOUR_D: { jumlah: 4, digit: 4 },
    THREE_D: { jumlah: 4, digit: 3 },
    TWO_D: { jumlah: 10, digit: 2 },
    COLOK_BEBAS: { jumlah: 2, digit: 1 },
    COLOK_BEBAS_2D: { jumlah: 3, digit: 2 },
    TWIN: { jumlah: 3, digit: 2 },
    BBFS: {
      besarKecil: { digit: 7 },
      genapGanjil: { digit: 5 }
    },
    SHIO: { jumlah: 3 }
  }
};

// ==================== ELEMEN DOM ====================
const outputElement = document.getElementById('prediction-output');
const tombolGenerate = document.getElementById('generate-button');
const teksGenerate = document.getElementById('generate-text');
const dropdownPasaran = document.getElementById('pasaran');
const grupPasaran = document.getElementById('pasaran-group');
const pesanError = document.getElementById('error-message');
const tombolSalin = document.getElementById('copy-button');

// ==================== FUNGSI UTILITAS ====================
function generateAngka(digit, jumlah) {
  if (digit <= 0 || jumlah <= 0) return [];
  const hasil = [];
  const maxNumber = Math.pow(10, digit);
  for (let i = 0; i < jumlah; i++) {
    let randomNumber = Math.floor(Math.random() * maxNumber);
    let angkaString = String(randomNumber).padStart(digit, '0');
    hasil.push(angkaString);
  }
  return hasil;
}

function generateAngkaKembar(jumlah, digit) {
  if (jumlah <= 0 || digit <= 0) return [];
  const hasil = [];
  for (let i = 0; i < jumlah; i++) {
    const digitKembar = Math.floor(Math.random() * 10).toString();
    hasil.push(digitKembar.repeat(digit));
  }
  return hasil;
}

function generateShio(jumlah) {
  if (jumlah <= 0) return [];
  const hasil = [];
  for (let i = 0; i < jumlah; i++) {
    const randomIndex = Math.floor(Math.random() * Config.SHIO.length);
    hasil.push(Config.SHIO[randomIndex]);
  }
  return hasil;
}

function dapatkanTanggalHariIniFormatted() {
  const sekarang = new Date();
  const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${HARI[sekarang.getDay()]}, ${sekarang.getDate()} ${BULAN[sekarang.getMonth()]} ${sekarang.getFullYear()}`;
}

// ==================== FUNGSI PREDIKSI ====================
function buatPrediksi(pasaran) {
  if (!Config.PASARAN.includes(pasaran)) {
    console.error(`Permintaan prediksi untuk pasaran tidak valid: '${pasaran}'`);
    return { error: `Pasaran '${pasaran}' tidak ditemukan dalam daftar konfigurasi.` };
  }

  const twinDigit = Config.GENERATOR.TWIN.digit || 2;

  return {
    pasaran: pasaran,
    tanggalFormatted: dapatkanTanggalHariIniFormatted(),
    bbfs: {
      besarKecil: generateAngka(Config.GENERATOR.BBFS.besarKecil.digit, 1)[0],
      genapGanjil: generateAngka(Config.GENERATOR.BBFS.genapGanjil.digit, 1)[0]
    },
    fourD: generateAngka(Config.GENERATOR.FOUR_D.digit, Config.GENERATOR.FOUR_D.jumlah),
    threeD: generateAngka(Config.GENERATOR.THREE_D.digit, Config.GENERATOR.THREE_D.jumlah),
    twoD: generateAngka(Config.GENERATOR.TWO_D.digit, Config.GENERATOR.TWO_D.jumlah),
    colokBebas: generateAngka(Config.GENERATOR.COLOK_BEBAS.digit, Config.GENERATOR.COLOK_BEBAS.jumlah),
    colokBebas2D: generateAngka(Config.GENERATOR.COLOK_BEBAS_2D.digit, Config.GENERATOR.COLOK_BEBAS_2D.jumlah),
    twin: generateAngkaKembar(Config.GENERATOR.TWIN.jumlah, twinDigit),
    shio: generateShio(Config.GENERATOR.SHIO.jumlah)
  };
}

function buatSemuaPrediksi() {
  const hasilPrediksi = [];
  const tanggalFormatted = dapatkanTanggalHariIniFormatted();

  Config.URUTAN_PASARAN.forEach(pasaran => {
    try {
      const prediksi = buatPrediksi(pasaran);
      if (!prediksi.error) {
        prediksi.tanggalFormatted = tanggalFormatted;
      }
      hasilPrediksi.push(prediksi);
    } catch (error) {
      console.error(`Kesalahan tak terduga saat membuat prediksi untuk ${pasaran}:`, error);
      hasilPrediksi.push({ pasaran: pasaran, error: `Kesalahan internal: ${error.message}` });
    }
  });

  return hasilPrediksi;
}

// ==================== FUNGSI TAMPILAN ====================
function showError(message) {
  pesanError.textContent = 'Error: ' + message;
  pesanError.style.display = 'block';
  hidePredictionOutput();
}

function hideError() {
  pesanError.style.display = 'none';
  pesanError.textContent = '';
}

function showLoading() {
  teksGenerate.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i> Memproses...';
  tombolGenerate.disabled = true;
  hidePredictionOutput();
  hideError();
}

function hideLoading() {
  teksGenerate.innerHTML = '<span>GENERATE PREDIKSI</span> <i class="fas fa-magic" style="margin-left: 8px;"></i>';
  tombolGenerate.disabled = false;
}

function showPredictionOutput() {
  outputElement.style.display = 'block';
  tombolSalin.style.display = 'block';
}

function hidePredictionOutput() {
  outputElement.style.display = 'none';
  tombolSalin.style.display = 'none';
  outputElement.innerHTML = '';
  delete outputElement.dataset.copyText;
  tombolSalin.innerHTML = '<i class="fas fa-copy" style="margin-right: 8px;"></i> <span>SALIN HASIL</span>';
  tombolSalin.classList.remove('copied');
}

function muatDaftarPasaranDropdown() {
  while (dropdownPasaran.options.length > 1) {
    dropdownPasaran.remove(1);
  }

  Config.PASARAN.forEach(pasaran => {
    const option = document.createElement('option');
    option.value = pasaran;
    option.textContent = pasaran;
    dropdownPasaran.appendChild(option);
  });

  if (dropdownPasaran.options.length > 1) {
    dropdownPasaran.options[0].text = '-- Pilih Pasaran --';
    dropdownPasaran.disabled = false;
  } else {
    dropdownPasaran.options[0].text = '-- Gagal Memuat Pasaran --';
    dropdownPasaran.disabled = true;
    showError("Gagal memuat daftar pasaran");
  }
}

function buatBaris(label, value) {
  const baris = document.createElement('div');
  baris.className = 'prediction-row';

  const labelSpan = document.createElement('span');
  labelSpan.className = 'prediction-label';
  labelSpan.textContent = label + ':';
  labelSpan.style.marginRight = '10px';

  const valueSpan = document.createElement('span');
  valueSpan.className = 'prediction-value';
  valueSpan.textContent = value;

  baris.appendChild(labelSpan);
  baris.appendChild(valueSpan);
  return baris;
}

function tampilkanPrediksiSingle(data) {
  hideLoading();
  if (data && data.error) {
    showError(data.error);
    return;
  }
  if (!data || !data.pasaran || !data.bbfs || !data.tanggalFormatted) {
    showError("Format data prediksi yang diterima tidak valid.");
    return;
  }

  outputElement.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'prediction-header';
  const judul = document.createElement('h2');
  judul.textContent = `PREDIKSI ${data.pasaran.toUpperCase()}`;
  const tanggal = document.createElement('div');
  tanggal.className = 'date';
  tanggal.textContent = data.tanggalFormatted;
  header.appendChild(judul);
  header.appendChild(tanggal);
  outputElement.appendChild(header);

  outputElement.appendChild(buatBaris('BBFS', data.bbfs.besarKecil));
  outputElement.appendChild(buatBaris('AM/AI/CK', data.bbfs.genapGanjil));

  const pembatas1 = document.createElement('div');
  pembatas1.className = 'prediction-divider';
  outputElement.appendChild(pembatas1);

  outputElement.appendChild(buatBaris('4D', data.fourD.join(' ')));
  outputElement.appendChild(buatBaris('3D', data.threeD.join(' ')));
  outputElement.appendChild(buatBaris('2D (BB)', data.twoD.join(' ')));

  const pembatas2 = document.createElement('div');
  pembatas2.className = 'prediction-divider';
  outputElement.appendChild(pembatas2);

  outputElement.appendChild(buatBaris('COLOK BEBAS', data.colokBebas.join(' / ')));
  outputElement.appendChild(buatBaris('COLOK BEBAS 2D', data.colokBebas2D.join(' / ')));
  outputElement.appendChild(buatBaris('TWIN', data.twin.join(' / ')));
  outputElement.appendChild(buatBaris('SHIO', data.shio.join(' / ')));

  const footer = document.createElement('div');
  footer.className = 'prediction-footer';
  footer.textContent = 'Selalu Utamakan Prediksi Sendiri';
  outputElement.appendChild(footer);

  outputElement.dataset.copyText = buatTeksSalinSingle(data);
  showPredictionOutput();
}

function tampilkanSemuaPrediksiAll(dataArray) {
  hideLoading();
  if (!dataArray || !Array.isArray(dataArray)) {
    showError("Tidak ada data prediksi yang diterima atau format tidak valid.");
    return;
  }

  outputElement.innerHTML = '';
  let teksSalin = '';
  let firstSuccessfulDate = null;

  const headerAll = document.createElement('div');
  headerAll.className = 'prediction-header';
  const judulAll = document.createElement('h2');
  judulAll.textContent = 'PREDIKSI SEMUA PASARAN';

  const successfulPredictions = dataArray.filter(data => data && !data.error);
  const failedPredictions = dataArray.filter(data => data && data.error);

  if (successfulPredictions.length > 0) {
    firstSuccessfulDate = successfulPredictions[0].tanggalFormatted;
    const tanggalAll = document.createElement('div');
    tanggalAll.className = 'date';
    tanggalAll.textContent = firstSuccessfulDate;
    headerAll.appendChild(judulAll);
    headerAll.appendChild(tanggalAll);
    outputElement.appendChild(headerAll);

    teksSalin += `Prediksi Semua Pasaran\n`;
    teksSalin += `Tanggal: ${firstSuccessfulDate}\n\n`;
  } else {
    headerAll.appendChild(judulAll);
    outputElement.appendChild(headerAll);
    teksSalin = "Tidak ada prediksi yang berhasil dihasilkan.";
  }

  successfulPredictions.forEach((prediksi, index) => {
    const pasaranBlock = document.createElement('div');
    pasaranBlock.className = 'pasaran-block';

    const judulPasaran = document.createElement('h3');
    judulPasaran.textContent = prediksi.pasaran;
    pasaranBlock.appendChild(judulPasaran);

    const pemisahJudul = document.createElement('div');
    pemisahJudul.className = 'prediction-divider inside-block';
    pasaranBlock.appendChild(pemisahJudul);

    pasaranBlock.appendChild(buatBaris('BBFS', prediksi.bbfs.besarKecil));
    pasaranBlock.appendChild(buatBaris('AM/AI/CK', prediksi.bbfs.genapGanjil));

    const pembatas1 = document.createElement('div');
    pembatas1.className = 'prediction-divider inside-block';
    pasaranBlock.appendChild(pembatas1);

    pasaranBlock.appendChild(buatBaris('4D', prediksi.fourD.join(' ')));
    pasaranBlock.appendChild(buatBaris('3D', prediksi.threeD.join(' ')));
    pasaranBlock.appendChild(buatBaris('2D (BB)', prediksi.twoD.join(' ')));

    const pembatas2 = document.createElement('div');
    pembatas2.className = 'prediction-divider inside-block';
    pasaranBlock.appendChild(pembatas2);

    pasaranBlock.appendChild(buatBaris('COLOK BEBAS', prediksi.colokBebas.join(' / ')));
    pasaranBlock.appendChild(buatBaris('COLOK BEBAS 2D', prediksi.colokBebas2D.join(' / ')));
    pasaranBlock.appendChild(buatBaris('TWIN', prediksi.twin.join(' / ')));
    pasaranBlock.appendChild(buatBaris('SHIO', prediksi.shio.join(' / ')));

    outputElement.appendChild(pasaranBlock);

    teksSalin += `Pasaran: ${prediksi.pasaran}\n`;
    teksSalin += `BBFS : ${prediksi.bbfs.besarKecil}\n`;
    teksSalin += `AM/AI/CK : ${prediksi.bbfs.genapGanjil}\n`;
    teksSalin += `4D : ${prediksi.fourD.join(' ')}\n`;
    teksSalin += `3D : ${prediksi.threeD.join(' ')}\n`;
    teksSalin += `2D (BB) : ${prediksi.twoD.join(' ')}\n`;
    teksSalin += `COLOK BEBAS : ${prediksi.colokBebas.join(' / ')}\n`;
    teksSalin += `COLOK BEBAS 2D : ${prediksi.colokBebas2D.join(' / ')}\n`;
    teksSalin += `TWIN : ${prediksi.twin.join(' / ')}\n`;
    teksSalin += `SHIO : ${prediksi.shio.join(' / ')}\n`;
    if (index < successfulPredictions.length - 1) {
      teksSalin += "\n";
    }
  });

  if (failedPredictions.length > 0) {
    if (successfulPredictions.length > 0) {
      const errorDivider = document.createElement('div');
      errorDivider.className = 'prediction-divider';
      errorDivider.style.margin = '20px 0';
      outputElement.appendChild(errorDivider);
    }

    const errorHeader = document.createElement('h3');
    errorHeader.style.color = 'var(--danger)';
    errorHeader.style.margin = '15px 0 5px';
    errorHeader.textContent = '⚠️ Gagal Menghasilkan Untuk Pasaran:';
    outputElement.appendChild(errorHeader);

    failedPredictions.forEach(fail => {
      const errorItem = document.createElement('p');
      errorItem.style.color = 'var(--danger)';
      errorItem.style.marginBottom = '5px';
      errorItem.textContent = `- ${fail.pasaran}: ${fail.error || 'Kesalahan tidak diketahui'}`;
      outputElement.appendChild(errorItem);
    });
  }

  const footer = document.createElement('div');
  footer.className = 'prediction-footer';
  footer.textContent = 'Selalu Utamakan Prediksi Sendiri';
  outputElement.appendChild(footer);

  if (successfulPredictions.length > 0 || failedPredictions.length > 0) {
    teksSalin += "\nSelalu Utamakan Prediksi Sendiri";
  }

  outputElement.dataset.copyText = teksSalin;
  showPredictionOutput();
}

function buatTeksSalinSingle(data) {
  return `Prediksi ${data.pasaran}\n` +
    `Hari ${data.tanggalFormatted}\n` +
    `BBFS : ${data.bbfs.besarKecil}\n` +
    `AM/AI/CK : ${data.bbfs.genapGanjil}\n` +
    `4D : ${data.fourD.join(' ')}\n` +
    `3D : ${data.threeD.join(' ')}\n` +
    `2D (BB) : ${data.twoD.join(' ')}\n` +
    `COLOK BEBAS : ${data.colokBebas.join(' / ')}\n` +
    `COLOK BEBAS 2D : ${data.colokBebas2D.join(' / ')}\n` +
    `TWIN : ${data.twin.join(' / ')}\n` +
    `SHIO : ${data.shio.join(' / ')}\n` +
    `Selalu Utamakan Prediksi Sendiri`;
}

function salinPrediksi() {
  const teksUntukDisalin = outputElement.dataset.copyText;
  if (!teksUntukDisalin) {
    console.warn("Tidak ada teks untuk disalin.");
    return;
  }

  navigator.clipboard.writeText(teksUntukDisalin).then(() => {
    console.log('Teks berhasil disalin!');
    tombolSalin.innerHTML = '<i class="fas fa-check" style="margin-right: 8px;"></i> <span>Berhasil Disalin</span>';
    tombolSalin.classList.add('copied');

    setTimeout(() => {
      tombolSalin.innerHTML = '<i class="fas fa-copy" style="margin-right: 8px;"></i> <span>SALIN HASIL</span>';
      tombolSalin.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Gagal menyalin teks: ', err);
    alert("Gagal menyalin teks otomatis. Silakan salin manual dari area hasil.");
  });
}

function toggleDropdownPasaran() {
  const jenisPrediksi = document.getElementById('prediction-type').value;
  if (jenisPrediksi === 'all') {
    grupPasaran.style.display = 'none';
    dropdownPasaran.removeAttribute('required');
  } else {
    grupPasaran.style.display = 'block';
    dropdownPasaran.setAttribute('required', '');
  }
  hidePredictionOutput();
  hideError();
}

function validasiInput() {
  const jenisPrediksi = document.getElementById('prediction-type').value;
  if (jenisPrediksi === 'single') {
    if (grupPasaran.style.display !== 'none' && !dropdownPasaran.value) {
      dropdownPasaran.classList.add('shake');
      setTimeout(() => {
        dropdownPasaran.classList.remove('shake');
      }, 500);
      showError("Mohon pilih pasaran terlebih dahulu.");
      return false;
    }
  }
  hideError();
  return true;
}

function generatePrediksi() {
  if (!validasiInput()) {
    console.log("Validasi input gagal.");
    return;
  }

  const jenisPrediksi = document.getElementById('prediction-type').value;
  showLoading();

  setTimeout(() => {
    if (jenisPrediksi === 'single') {
      const pasaranTerpilih = dropdownPasaran.value;
      console.log(`Membuat prediksi untuk: ${pasaranTerpilih}`);
      tampilkanPrediksiSingle(buatPrediksi(pasaranTerpilih));
    } else {
      console.log("Membuat semua prediksi");
      tampilkanSemuaPrediksiAll(buatSemuaPrediksi());
    }
    hideLoading();
  }, 500);
}

// ==================== INISIALISASI ====================
document.addEventListener('DOMContentLoaded', function() {
  console.log("Aplikasi diinisialisasi...");
  
  muatDaftarPasaranDropdown();
  
  document.getElementById('prediction-type').addEventListener('change', toggleDropdownPasaran);
  document.getElementById('generate-button').addEventListener('click', generatePrediksi);
  document.getElementById('copy-button').addEventListener('click', salinPrediksi);
  
  toggleDropdownPasaran();
});

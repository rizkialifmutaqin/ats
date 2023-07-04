import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function FormSiswa() {
  const [siswa, setSiswa] = useState({
    nisn: "",
    nis: "",
    nama_lengkap: "",
    kelas_terakhir: "",
    foto: null,
    tempat_lahir: "",
    tanggal_lahir: "",
    email_siswa: "",
    no_telp_siswa: "",
    alamat: "",
    kota: "",
    provinsi: "",
    angkatan: "",
    tahun_kelulusan: "",
    jurusan: "",
    aktifitas_stlh_lulus: "",
    id_login: "",
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.id_login) {
      setSiswa((prevSiswa) => ({
        ...prevSiswa,
        id_login: location.state.id_login,
      }));
      console.log("id_login:", location.state.id_login);
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "foto") {
      setSiswa({ ...siswa, foto: files[0] });
    } else {
      setSiswa({ ...siswa, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nisn", siswa.nisn);
      formData.append("nis", siswa.nis);
      formData.append("nama_lengkap", siswa.nama_lengkap);
      formData.append("kelas_terakhir", siswa.kelas_terakhir);
      formData.append("foto", siswa.foto);
      formData.append("tempat_lahir", siswa.tempat_lahir);
      formData.append("tanggal_lahir", siswa.tanggal_lahir);
      formData.append("email_siswa", siswa.email_siswa);
      formData.append("no_telp_siswa", siswa.no_telp_siswa);
      formData.append("alamat", siswa.alamat);
      formData.append("kota", siswa.kota);
      formData.append("provinsi", siswa.provinsi);
      formData.append("angkatan", siswa.angkatan);
      formData.append("tahun_kelulusan", siswa.tahun_kelulusan);
      formData.append("jurusan", siswa.jurusan);
      formData.append("aktifitas_stlh_lulus", siswa.aktifitas_stlh_lulus);
      formData.append("id_login", siswa.id_login);
      const response = await axios.post(
        "http://localhost:5000/api/dataSiswa",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        setSiswa({ 
          nisn: "", 
          nis: "", 
          nama_lengkap: "", 
          kelas_terakhir: "", 
          foto: null, 
          tempat_lahir: "", 
          tanggal_lahir: "", 
          email_siswa: "", 
          no_telp_siswa: "", 
          alamat: "", 
          kota: "", 
          provinsi: "", 
          angkatan: "", 
          tahun_kelulusan: "", 
          jurusan: "", 
          aktifitas_stlh_login: "", 
          id_login: "" 
        });
        // history.push({
        //   pathname: "/formKuliah",
        //   state: { id_siswa: response.data.id_siswa }, // Menyimpan id_siswa yang diterima dari server
        // });
        // localStorage.setItem("formSiswaSubmitted", "true");
        
        if (siswa.aktifitas_stlh_lulus === "Kuliah") {
          history.push({
            pathname: "/formKuliah",
            state: { id_siswa: response.data.id_siswa },
          });
        } else if (siswa.aktifitas_stlh_lulus === "Kerja") {
          history.push({
            pathname: "/formKerja",
            state: { id_siswa: response.data.id_siswa },
          });
        } else if (siswa.aktifitas_stlh_lulus === "Kuliah dan Kerja") {
          history.push({
            pathname: "/formKuliahDanKerja",
            state: { id_siswa: response.data.id_siswa },
          });
        } else if (siswa.aktifitas_stlh_lulus === "Wirausaha") {
          history.push({
            pathname: "/formWirausaha",
            state: { id_siswa: response.data.id_siswa },
          });
        } else if (siswa.aktifitas_stlh_lulus === "Menganggur") {
          history.push({
            pathname: "/",
          });
        }
        console.log(response.data.id_siswa);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = {
  //       nisn: siswa.nisn,
  //       nis: siswa.nis,
  //       nama_lengkap: siswa.nama_lengkap,
  //       jurusan: siswa.jurusan,
  //       aktifitas_stlh_lulus: siswa.aktifitas_stlh_lulus,
  //       id_login: siswa.id_login,
  //     };
  //     const response = await axios.post(
  //       "http://localhost:5000/api/dataSiswa",
  //       formData
  //     );
  //     if (response.data) {
  //       alert(response.data.message);
  //       setSiswa({
  //         nisn: "",
  //         nis: "",
  //         nama_lengkap: "",
  //         jurusan: "",
  //         aktifitas_stlh_lulus: "",
  //         id_login: "",
  //       });
  //       history.push({
  //         pathname: "/testingPage",
  //         state: { id_siswa: response.data.id_siswa }, // Menyimpan id_siswa yang diterima dari server
  //       });
  //       console.log(response.data.id_siswa);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleBack = () => {
    history.push("/isiFormulir");
  };

  return (
    <div className="p-4">
      <button className="back-button mb-2">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={handleBack}
          style={{ color: "black" }}
        />
      </button>
      <h1>Masukkan Data Pribadi Anda</h1>
      <Form onSubmit={handleSubmit} className="row gy-3">
        <Form.Group controlId="formNisn">
          <Form.Label>NISN</Form.Label>
          <Form.Control
            type="number"
            name="nisn"
            value={siswa.nisn}
            onChange={handleChange}
            placeholder="Masukkan NISN"
          />
        </Form.Group>
        <Form.Group controlId="formNis">
          <Form.Label>NIS</Form.Label>
          <Form.Control
            type="number"
            name="nis"
            value={siswa.nis}
            onChange={handleChange}
            placeholder="Masukkan NIS"
          />
        </Form.Group>
        <Form.Group controlId="formNamaLengkap">
          <Form.Label>Nama Lengkap</Form.Label>
          <Form.Control
            type="text"
            name="nama_lengkap"
            value={siswa.nama_lengkap}
            onChange={handleChange}
            placeholder="Masukkan Nama Lengkap"
          />
        </Form.Group>
        <Form.Group controlId="formKelasTerakhir">
          <Form.Label>Kelas Terakhir</Form.Label>
          <Form.Control
            type="text"
            name="kelas_terakhir"
            value={siswa.kelas_terakhir}
            onChange={handleChange}
            placeholder="Masukkan Kelas Terakhir Anda"
          />
        </Form.Group>
        <Form.Group controlId="formFotoSiswa">
          <Form.Label>Foto Siswa</Form.Label>
          <Form.Control
            type="file"
            name="foto"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTempatLahir">
          <Form.Label>Tempat Lahir</Form.Label>
          <Form.Control
            type="text"
            name="tempat_lahir"
            value={siswa.tempat_lahir}
            onChange={handleChange}
            placeholder="Masukkan Tempat Lahir"
          />
        </Form.Group>
        <Form.Group controlId="formTanggalLahir">
          <Form.Label>Tanggal Lahir</Form.Label>
          <Form.Control
            type="date"
            name="tanggal_lahir"
            value={siswa.tanggal_lahir}
            onChange={handleChange}
            placeholder="Masukkan Tanggal Lahir"
          />
        </Form.Group>
        <Form.Group controlId="formEmailSiswa">
          <Form.Label>Email Siswa</Form.Label>
          <Form.Control
            type="email"
            name="email_siswa"
            value={siswa.email_siswa}
            onChange={handleChange}
            placeholder="Masukkan Email Siswa"
          />
        </Form.Group>
        <Form.Group controlId="formNoTelpSiswa">
          <Form.Label>No Telepon Siswa</Form.Label>
          <Form.Control
            type="text"
            name="no_telp_siswa"
            value={siswa.no_telp_siswa}
            onChange={handleChange}
            placeholder="Masukkan No Telepon Siswa"
          />
        </Form.Group>
        <Form.Group controlId="formAlamat">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="alamat"
            rows={3}
            value={siswa.alamat}
            onChange={handleChange}
            placeholder="Masukkan Alamat Tempat Tinggal"
          />
        </Form.Group>
        <Form.Group controlId="formKota">
          <Form.Label>Kota</Form.Label>
          <Form.Control
            type="text"
            name="kota"
            value={siswa.kota}
            onChange={handleChange}
            placeholder="Masukkan Kota"
          />
        </Form.Group>
        <Form.Group controlId="formProvinsi">
          <Form.Label>Provinsi</Form.Label>
          <Form.Control
            type="text"
            name="provinsi"
            value={siswa.provinsi}
            onChange={handleChange}
            placeholder="Masukkan Provinsi"
          />
        </Form.Group>
        <Form.Group controlId="formAngkatan">
          <Form.Label>Tahun Angkatan</Form.Label>
          <Form.Control
            type="number"
            name="angkatan"
            value={siswa.angkatan}
            onChange={handleChange}
            placeholder="Masukkan Tahun Angkatan Anda"
          />
        </Form.Group>
        <Form.Group controlId="formTahunKelulusan">
          <Form.Label>Tahun Kelulusan</Form.Label>
          <Form.Control
            type="number"
            name="tahun_kelulusan"
            value={siswa.tahun_kelulusan}
            onChange={handleChange}
            placeholder="Masukkan Tahun Kelulusan"
          />
        </Form.Group>
        <Form.Group controlId="formJurusan">
          <Form.Label>Jurusan</Form.Label>
          <Form.Control
            as="select"
            name="jurusan"
            value={siswa.jurusan}
            onChange={handleChange}
          >
            <option value="">-- Pilih Jurusan --</option>
            <option value="TKJ">TKJ</option>
            <option value="RPL">RPL</option>
            <option value="TJA">TJA</option>
            <option value="TR">TR</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formAktifitasSetelahLulus">
          <Form.Label>Aktifitas Setelah Lulus</Form.Label>
          <Form.Control
            as="select"
            name="aktifitas_stlh_lulus"
            value={siswa.aktifitas_stlh_lulus}
            onChange={handleChange}
          >
            <option value="">-- Aktifitas Setelah Lulus --</option>
            <option value="Kuliah">Kuliah</option>
            <option value="Kerja">Kerja</option>
            <option value="Kuliah dan Kerja">Kuliah dan Kerja</option>
            <option value="Wirausaha">Wirausaha</option>
            <option value="Menganggur">Menganggur (Belum Kuliah / Kerja)</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Simpan
        </Button>
      </Form>
    </div>
  );
}

export default FormSiswa;
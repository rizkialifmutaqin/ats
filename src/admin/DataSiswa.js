import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";

const DataSiswa = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [filterJurusan, setFilterJurusan] = useState("Semua");
  const [filterUmur, setFilterUmur] = useState("")
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataSiswaWithLogin")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataSiswa/editSiswa/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataSiswa/tambahSiswa`);
  };

  const handleDelete = (id, pic_siswa) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data siswa ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataSiswa/${id}`)
        .then(() => {
          if (pic_siswa) {
            axios
              .delete(`http://localhost:5000/api/images/${pic_siswa}`)
              .catch((err) => console.error(err));
          }
          fetchData();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterKelas = (kelas) => {
    setFilterKelas(kelas);
    setSearchTerm("");
  };

  const handleFilterJurusan = (jurusan) => {
    setFilterJurusan(jurusan);
    setSearchTerm("");
  };

  let filteredData = data;

  if (filterUmur === "tertua") {
    filteredData = filteredData.sort((a, b) => b.umur - a.umur);
  } else if (filterUmur === "termuda") {
    filteredData = filteredData.sort((a, b) => a.umur - b.umur);
  } else if (filterUmur === "") {
    filteredData = filteredData.sort((a, b) => a.id_siswa - b.id_siswa);
  }

  filteredData = filteredData.filter(
    (item) =>
      (item.id_siswa.toString().includes(searchTerm) ||
        item.id_login.toString().includes(searchTerm) ||
        item.nisn.toString().includes(searchTerm) ||
        item.nis.toString().includes(searchTerm) ||
        item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kelas_terakhir.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tempat_lahir.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tanggal_lahir.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email_siswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.no_telp_siswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provinsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.angkatan.toString().includes(searchTerm) ||
        item.tahun_kelulusan.toString().includes(searchTerm) ||
        item.jurusan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.aktifitas_stlh_lulus.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterKelas === "Semua" || item.kelas === filterKelas) &&
      (filterJurusan === "Semua" || item.jurusan === filterJurusan)
  );

  const exportDataToExcel = (rowData) => {
    const filename = `data_siswa_${rowData.nama_lengkap}.xlsx`;

    const exportData = {
      "ID Siswa": rowData.id_siswa,
      "ID Login": rowData.id_login,
      "Nama Lengkap": rowData.nama_lengkap,
      "Kelas Terakhir": rowData.kelas_terakhir,
      "Tempat Lahir": rowData.tempat_lahir,
      "Tanggal Lahir": rowData.tanggal_lahir,
      "Email Siswa": rowData.email_siswa,
      "No Telepon Siswa": rowData.no_telp_siswa,
      "Alamat Tinggal Siswa": rowData.alamat,
      "Kota": rowData.kota,
      "Provinsi": rowData.provinsi,
      "Tahun Angkatan": rowData.angkatan,
      "Jurusan": rowData.jurusan,
      "Aktifitas Setelah Lulus": rowData.aktifitas_stlh_lulus,
    };

    const worksheet = XLSX.utils.json_to_sheet([exportData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");
    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_siswa_all.xlsx";
    const exportData = data.map((item) => ({
      "ID Siswa": item.id_siswa,
      "ID Login": item.id_login,
      "Nama Lengkap": item.nama_lengkap,
      "Kelas Terakhir": item.kelas_terakhir,
      "Tempat Lahir": item.tempat_lahir,
      "Tanggal Lahir": item.tanggal_lahir,
      "Email Siswa": item.email_siswa,
      "No Telepon Siswa": item.no_telp_siswa,
      "Alamat Tinggal Siswa": item.alamat,
      "Kota": item.kota,
      "Provinsi": item.provinsi,
      "Tahun Angkatan": item.angkatan,
      "Jurusan": item.jurusan,
      "Aktifitas Setelah Lulus": item.aktifitas_stlh_lulus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 content">
        <div className="text-center my-5">
          <h1>Data Siswa</h1>
          <Button
            onClick={() => handleTambah()}
            className="mb-2"
            variant="outline-primary"
          >
            Tambah Data Siswa
          </Button>
          <div className="text-center my-3">
            <Button
              onClick={() => exportAllDataToExcel()}
              className="btn btn-success"
            >
              Export Semua Data ke Excel
            </Button>
          </div>
          <Form.Control
            type="text"
            placeholder="Cari berdasarkan ID Siswa, ID Login, Nama, Username, Kelas, atau Umur"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Form.Group className="mt-2 mb-2 w-25">
            <Form.Select
              value={filterKelas}
              onChange={(e) => handleFilterKelas(e.target.value)}
            >
              <option value="Semua">Semua Kelas</option>
              <option value="X">Kelas X</option>
              <option value="XI">Kelas XI</option>
              <option value="XII">Kelas XII</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-2 mb-2 w-25">
            <Form.Select
              value={filterJurusan}
              onChange={(e) => handleFilterJurusan(e.target.value)}
            >
              <option value="Semua">Semua Jurusan</option>
              <option value="RPL">RPL</option>
              <option value="TKJ">TKJ</option>
              <option value="TJA">TJA</option>
              <option value="TR">TR</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-2 mb-2 w-25">
            <Form.Select
              value={filterUmur}
              onChange={(e) => setFilterUmur(e.target.value)}
            >
              <option value="">Urutkan Umur</option>
              <option value="tertua">Umur Tertua</option>
              <option value="termuda">Umur Termuda</option>
            </Form.Select>
          </Form.Group>
        </div>
        <table className="table table-hover">
          <thead className="table-dark">
            <tr className="text-center">
              <th>ID Siswa</th>
              <th>ID Login</th>
              <th>NISN</th>
              <th>NIS</th>
              <th>Nama Lengkap</th>
              <th>Kelas Terakhir</th>
              <th>Username</th>
              <th>Foto Siswa</th>
              <th>Tempat Lahir</th>
              <th>Tanggal Lahir (Tahun - Bulan - Hari)</th>
              <th>Email Siswa</th>
              <th>No Telepon Siswa</th>
              <th>Alamat</th>
              <th>Kota</th>
              <th>Provinsi</th>
              <th>Angkatan</th>
              <th>Tahun Kelulusan</th>
              <th>Jurusan</th>
              <th>Aktifitas Setelah Lulus</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id_siswa} className="text-center">
                <td>{item.id_siswa}</td>
                <td>{item.id_login}</td>
                <td>{item.nisn}</td>
                <td>{item.nis}</td>
                <td>{item.nama_lengkap}</td>
                <td>{item.kelas_terakhir}</td>
                <td>{item.username}</td>
                <td>
                  <img
                    src={`http://localhost:5000/images/${item.pic_siswa}`}
                    alt={item.nama_lengkap}
                    style={{ width: 150 }}
                  />
                </td>
                <td>{item.tempat_lahir}</td>
                <td>{item.tanggal_lahir}</td>
                <td>{item.email_siswa}</td>
                <td>{item.no_telp_siswa}</td>
                <td>{item.alamat}</td>
                <td>{item.kota}</td>
                <td>{item.provinsi}</td>
                <td>{item.angkatan}</td>
                <td>{item.tahun_kelulusan}</td>
                <td>{item.jurusan}</td>
                <td>{item.aktifitas_stlh_lulus}</td>
                <td>
                  <Button
                    onClick={() => handleEdit(item.id_siswa)}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => handleDelete(item.id_siswa, item.pic_siswa)}
                    className="btn btn-danger"
                  >
                    Hapus
                  </Button>{" "}
                  <Button
                    onClick={() => exportDataToExcel(item)}
                    className="btn btn-success  "
                  >
                    Export ke Excel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSiswa;

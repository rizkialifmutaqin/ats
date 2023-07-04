import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";

const DataSiswaKuliah = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJurusan, setFilterJurusan] = useState("Semua");
  const [filterJenjangPendidikan, setFilterJenjangPendidikan] = useState("Semua");
  const [filterUmur, setFilterUmur] = useState("")
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataSiswaKuliahWithSiswa")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataSiswaKuliah/editSiswaKuliah/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataSiswaKuliah/tambahSiswaKuliah`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataSiswaKuliah/${id}`)
        .then(() => {
          fetchData();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterJurusan = (jurusan) => {
    setFilterJurusan(jurusan);
    setSearchTerm("");
  };

  const handleFilterJenjangPendidikan = (jenjang_pendidikan) => {
    setFilterJenjangPendidikan(jenjang_pendidikan);
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
      (item.id_kuliah.toString().includes(searchTerm) ||
        item.id_siswa.toString().includes(searchTerm) ||
        item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_perguruan_tinggi_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat_perguruan_tinggi_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota_perguruan_tinggi_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jurusan_perguruan_tinggi_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jenjang_pendidikan_tgl.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterJurusan === "Semua" || item.jurusan === filterJurusan) &&
      (filterJenjangPendidikan === "Semua" || item.jenjang_pendidikan_tgl === filterJenjangPendidikan)
  );

  const exportDataToExcel = (rowData) => {
    const filename = `data_kuliah_${rowData.nama_lengkap}.xlsx`;

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
      "Nama Perguruan Tinggi": rowData.nama_perguruan_tinggi_tgl,
      "Alamat Perguruan Tinggi": rowData.alamat_perguruan_tinggi_tgl,
      "Kota Perguruan Tinggi": rowData.kota_perguruan_tinggi_tgl,
      "Jurusan Perguruan Tinggi": rowData.jurusan_perguruan_tinggi_tgl,
      "Jenjang Pendidikan": rowData.jenjang_pendidikan_tgl,
    };

    const worksheet = XLSX.utils.json_to_sheet([exportData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");
    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_kuliah_all.xlsx";
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
      "Nama Perguruan Tinggi": item.nama_perguruan_tinggi_tgl,
      "Alamat Perguruan Tinggi": item.alamat_perguruan_tinggi_tgl,
      "Kota Perguruan Tinggi": item.kota_perguruan_tinggi_tgl,
      "Jurusan Perguruan Tinggi": item.jurusan_perguruan_tinggi_tgl,
      "Jenjang Pendidikan": item.jenjang_pendidikan_tgl,
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
          <h1>Data Siswa Kuliah</h1>
          <Button
            onClick={() => handleTambah()}
            className="mb-2"
            variant="outline-primary"
          >
            Tambah Data Siswa Kuliah
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
              value={filterJenjangPendidikan}
              onChange={(e) => handleFilterJenjangPendidikan(e.target.value)}
            >
              <option value="Semua">Semua Jenjang Pendidikan</option>
              <option value="D3">D3</option>
              <option value="D4">D4</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
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
              <th>Nama Siswa</th>
              <th>Nama Perguruan Tinggi</th>
              <th>Alamat Perguruan Tinggi</th>
              <th>Kota</th>
              <th>Jurusan</th>
              <th>Jenjang Pendidikan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id_kuliah} className="text-center">
                <td>{item.nama_lengkap}</td>
                <td>{item.nama_perguruan_tinggi_tgl}</td>
                <td>{item.alamat_perguruan_tinggi_tgl}</td>
                <td>{item.kota_perguruan_tinggi_tgl}</td>
                <td>{item.jurusan_perguruan_tinggi_tgl}</td>
                <td>{item.jenjang_pendidikan_tgl}</td>
                <td>
                  <Button
                    onClick={() => handleEdit(item.id_kuliah)}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => handleDelete(item.id_kuliah)}
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

export default DataSiswaKuliah;

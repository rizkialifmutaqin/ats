import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";

const DataSiswaKerja = () => {
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
      .get("http://localhost:5000/api/dataSiswaKerjaWithSiswa")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataSiswaKerja/editSiswaKerja/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataSiswaKerja/tambahSiswaKerja`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataSiswaKerja/${id}`)
        .then(() => {
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
      (item.id_kerja.toString().includes(searchTerm) ||
        item.id_siswa.toString().includes(searchTerm) ||
        item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_hrd_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.no_telp_hrd_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tahun_mulai_bekerja_tgl.toString().includes(searchTerm)) &&
      (filterKelas === "Semua" || item.kelas === filterKelas) &&
      (filterJurusan === "Semua" || item.jurusan === filterJurusan)
  );

  const exportDataToExcel = (rowData) => {
    const filename = `data_kerja_${rowData.nama_lengkap}.xlsx`;

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
      "Nama Perusahaan": rowData.nama_perusahaan_tgl,
      "Alamat Perusahaan": rowData.alamat_perusahaan_tgl,
      "Kota Perusahaan": rowData.kota_perusahaan_tgl,
      "Nama HRD Perusahaan": rowData.nama_hrd_perusahaan_tgl,
      "No Telepon HRD": rowData.no_telp_hrd_perusahaan_tgl,
      "Tahun Mulai Kerja": rowData.tahun_mulai_bekerja_tgl,
    };

    const worksheet = XLSX.utils.json_to_sheet([exportData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");
    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_kerja_all.xlsx";
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
      "Nama Perusahaan": item.nama_perusahaan_tgl,
      "Alamat Perusahaan": item.alamat_perusahaan_tgl,
      "Kota Perusahaan": item.kota_perusahaan_tgl,
      "Nama HRD Perusahaan": item.nama_hrd_perusahaan_tgl,
      "No Telepon HRD": item.no_telp_hrd_perusahaan_tgl,
      "Tahun Mulai Kerja": item.tahun_mulai_bekerja_tgl,
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
          <h1>Data Siswa Kerja</h1>
          <Button
            onClick={() => handleTambah()}
            className="mb-2"
            variant="outline-primary"
          >
            Tambah Data Siswa Kerja
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
              <th>Nama Siswa</th>
              <th>Nama Perusahaan</th>
              <th>Alamat Perusahaan</th>
              <th>Kota</th>
              <th>Nama HRD Perusahaan</th>
              <th>No Telepon HRD Perusahaan</th>
              <th>Tahun Mulai Kerja</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id_kerja} className="text-center">
                <td>{item.nama_lengkap}</td>
                <td>{item.nama_perusahaan_tgl}</td>
                <td>{item.alamat_perusahaan_tgl}</td>
                <td>{item.kota_perusahaan_tgl}</td>
                <td>{item.nama_hrd_perusahaan_tgl}</td>
                <td>{item.no_telp_hrd_perusahaan_tgl}</td>
                <td>{item.tahun_mulai_bekerja_tgl}</td>
                {/* <td>
                  <img
                    src={`http://localhost:5000/images/${item.pic_siswa}`}
                    alt={item.nama}
                    style={{ width: 150 }}
                  />
                </td> */}
                <td>
                  <Button
                    onClick={() => handleEdit(item.id_kerja)}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => handleDelete(item.id_kerja)}
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

export default DataSiswaKerja;

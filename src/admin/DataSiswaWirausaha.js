import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";

const DataSiswaWirausaha = () => {
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
      .get("http://localhost:5000/api/dataSiswaWirausahaWithSiswa")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataSiswaWirausaha/editSiswaWirausaha/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataSiswaWirausaha/tambahSiswaWirausaha`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataSiswaWirausaha/${id}`)
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
      (item.id_wirausaha.toString().includes(searchTerm) ||
        item.id_siswa.toString().includes(searchTerm) ||
        item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bidang_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.no_telp_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tahun_mulai_usaha.toString().includes(searchTerm)) &&
      (filterKelas === "Semua" || item.kelas === filterKelas) &&
      (filterJurusan === "Semua" || item.jurusan === filterJurusan)
  );

  const exportDataToExcel = (rowData) => {
    const filename = `data_siswa_wirausaha_${rowData.nama_lengkap}.xlsx`;

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
      "Nama Usaha": rowData.nama_usaha,
      "Bidang Usaha": rowData.bidang_usaha,
      "Alamat Usaha": rowData.alamat_usaha,
      "Kota Usaha": rowData.kota_usaha,
      "No Telepon Usaha": rowData.no_telp_usaha,
      "Tahun Mulai Usaha": rowData.tahun_mulai_usaha,
    };

    const worksheet = XLSX.utils.json_to_sheet([exportData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");
    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_siswa_wirausaha_all.xlsx";
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
      "Nama Usaha": item.nama_usaha,
      "Bidang Usaha": item.bidang_usaha,
      "Alamat Usaha": item.alamat_usaha,
      "Kota Usaha": item.kota_usaha,
      "No Telepon Usaha": item.no_telp_usaha,
      "Tahun Mulai Usaha": item.tahun_mulai_usaha,
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
          <h1>Data Siswa Wirausaha</h1>
          <Button
            onClick={() => handleTambah()}
            className="mb-2"
            variant="outline-primary"
          >
            Tambah Data Siswa Wirausaha
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
              <th>Nama Usaha</th>
              <th>Bidang Usaha</th>
              <th>Alamat Usaha</th>
              <th>Kota</th>
              <th>No Telepon</th>
              <th>Tahun Mulai Usaha</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id_wirausaha} className="text-center">
                <td>{item.nama_lengkap}</td>
                <td>{item.nama_usaha}</td>
                <td>{item.bidang_usaha}</td>
                <td>{item.alamat_usaha}</td>
                <td>{item.kota_usaha}</td>
                <td>{item.no_telp_usaha}</td>
                <td>{item.tahun_mulai_usaha}</td>
                {/* <td>
                  <img
                    src={`http://localhost:5000/images/${item.pic_siswa}`}
                    alt={item.nama}
                    style={{ width: 150 }}
                  />
                </td> */}
                <td>
                  <Button
                    onClick={() => handleEdit(item.id_wirausaha)}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => handleDelete(item.id_wirausaha)}
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

export default DataSiswaWirausaha;

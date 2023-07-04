import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditSiswaKerja = () => {
  const { id } = useParams();
  const history = useHistory();
  const [kerja, setKerja] = useState({});
  // const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataSiswaKerja/" + id)
      .then((res) => setKerja(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKerja((prevKerja) => ({
      ...prevKerja,
      [name]: value,
    }));
  };

  // const handleImageChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/dataSiswa/${id}`, siswa
  //     );
  //     if (response.data) {
  //       alert(response.data.message);
  //       history("/dataSiswa");
  //       return;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };
  // const handleSubmit = async (event) => {
  //   e.preventDefault();
  //   try {
  //     const hashedPassword = await hash(login.password, 10);
  //     const formData = {
  //       username: login.username,
  //       password: hashedPassword,
  //       role: login.role,
  //     };
  //     const response = await axios.post(
  //       `http://localhost:5000/api/dataLogin/${id}`, 
  //       formData
  //     );
  //     if (response.data) {
  //       alert(response.data.message);
  //       setLogin({ username: "", password: "", role: "" });
  //       history.push("/dataLogin");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        nama_perusahaan_tgl: kerja.nama_perusahaan_tgl,
        alamat_perusahaan_tgl: kerja.alamat_perusahaan_tgl,
        kota_perusahaan_tgl: kerja.kota_perusahaan_tgl,
        nama_hrd_perusahaan_tgl: kerja.nama_hrd_perusahaan_tgl,
        no_telp_hrd_perusahaan_tgl: kerja.no_telp_hrd_perusahaan_tgl,
        tahun_mulai_bekerja_tgl: kerja.tahun_mulai_bekerja_tgl,
        id_siswa: kerja.id_siswa,
      };
      const response = await axios.put(
        `http://localhost:5000/api/dataSiswaKerja/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        history.push("/dataSiswaKerja");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleBack = () => {
    history.push("/dataSiswaKerja");
  };

  return (
      <div className="p-3">
        <button className="back-button mb-2">
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
        </button>
        <h2>Edit Data Siswa Kerja</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNamaPerusahaan">
            <Form.Label>Nama Perusahaan</Form.Label>
            <Form.Control
              type="text"
              name="nama_perusahaan_tgl"
              value={kerja.nama_perusahaan_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formAlamatPerusahaan">
            <Form.Label>Alamat Perusahaan</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="alamat_perusahaan_tgl"
              rows={3}
              value={kerja.alamat_perusahaan_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Alamat Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formKota">
            <Form.Label>Kota</Form.Label>
            <Form.Control
              type="text"
              name="kota_perusahaan_tgl"
              value={kerja.kota_perusahaan_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Kota"
            />
          </Form.Group>
          <Form.Group controlId="formNamaHrd">
            <Form.Label>Nama HRD Perusahaan</Form.Label>
            <Form.Control
              type="text"
              name="nama_hrd_perusahaan_tgl"
              value={kerja.nama_hrd_perusahaan_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Nama HRD Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formNoTelpHrd">
            <Form.Label>No Telepon HRD Perusahaan</Form.Label>
            <Form.Control
              type="text"
              name="no_telp_hrd_perusahaan_tgl"
              value={kerja.no_telp_hrd_perusahaan_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Nomor Telepon HRD Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formTahunMulaiBekerja">
            <Form.Label>Tahun Mulai Kerja</Form.Label>
            <Form.Control
              type="number"
              name="tahun_mulai_bekerja_tgl"
              value={kerja.tahun_mulai_bekerja_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Tahun Mulai Kerja"
            />
          </Form.Group>
          <Form.Group controlId="formIdSiswa">
            <Form.Label>Id Siswa</Form.Label>
            <Form.Control
              type="number"
              name="id_siswa"
              value={kerja.id_siswa}
              onChange={handleInputChange}
              placeholder="Masukkan Id Siswa"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Form>
      </div>
  );
};

export default EditSiswaKerja;

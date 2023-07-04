import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

// const iconPath =
//   "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function MainPage() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const id_login = location.state?.id_login;
    console.log("main page", id_login);
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    const fetchData = () => {
      if (id_login) {
        axios
          .get(`http://localhost:5000/api/dataSiswaLengkap?id_login=${id_login}`)
          .then((response) => {
            const filteredData = response.data.filter(
              (item) => item.id_login === id_login
            );
            setUserData(filteredData);
            setLoading(false);
            localStorage.setItem("userData", JSON.stringify(filteredData));
          })
          .catch((err) => console.error(err));
      } else if (storedUserData) {
        setUserData(storedUserData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchData, 500); // Delay data fetching for 2 seconds

    return () => clearTimeout(timeout); // Clear the timeout if component unmounts

  }, [location.state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userData.length === 0) {
    return <div style={{ textAlign: 'center' }}>Data Tidak Ditemukan, Isi Formulir Terlebih Dahulu</div>;
  }

  return (
    <>
      {userData.map((item) => (
        <div className="container mt-5 py-4 px-xl-5">
          <ScrollToTopOnMount />
          <div className="row mb-4">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12 mb-4">
                  <img
                    className="border rounded ratio ratio-1x1"
                    alt=""
                    src={`http://localhost:5000/images/${item.pic_siswa}`}
                  // style={{width: 400}}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="d-flex flex-column h-100">
                <h2 className="mb-3">{item.nama_lengkap}</h2>
                <h5 className="text-muted mb-2">NISN : {item.nisn}</h5>
                <h5 className="text-muted mb-5">NIS : {item.nis}</h5>
                <h5 className="mb-0">Data Diri</h5>
                <hr />
                <dl className="row">
                  <dt className="col-sm-6">Nama</dt>
                  <dd className="col-sm-8 mb-4">{item.nama_lengkap}</dd>

                  <dt className="col-sm-6">Kelas Terakhir</dt>
                  <dd className="col-sm-8 mb-4">{item.kelas_terakhir}</dd>

                  <dt className="col-sm-6">Tempat Lahir</dt>
                  <dd className="col-sm-8 mb-4">{item.tempat_lahir}</dd>

                  <dt className="col-sm-6">Tanggal Lahir</dt>
                  <dd className="col-sm-8 mb-4">{item.tanggal_lahir}</dd>

                  <dt className="col-sm-6">Email Siswa</dt>
                  <dd className="col-sm-8 mb-4">{item.email_siswa}</dd>

                  <dt className="col-sm-6">No Telepon</dt>
                  <dd className="col-sm-8 mb-4">{item.no_telp_siswa}</dd>

                  <dt className="col-sm-6">Alamat</dt>
                  <dd className="col-sm-8 mb-4">{item.alamat}</dd>

                  <dt className="col-sm-6">Kota</dt>
                  <dd className="col-sm-8 mb-4">{item.kota}</dd>

                  <dt className="col-sm-6">Provinsi</dt>
                  <dd className="col-sm-8 mb-4">{item.provinsi}</dd>

                  <dt className="col-sm-6">Angkatan</dt>
                  <dd className="col-sm-8 mb-4">{item.angkatan}</dd>

                  <dt className="col-sm-6">Jurusan</dt>
                  <dd className="col-sm-8 mb-4">{item.jurusan}</dd>

                  <dt className="col-sm-6">Tahun Kelulusan</dt>
                  <dd className="col-sm-8 mb-4">{item.tahun_kelulusan}</dd>

                  <dt className="col-sm-6">Setelah Lulus</dt>
                  <dd className="col-sm-8 mb-5">{item.aktifitas_stlh_lulus}</dd>
                </dl>

                <h5 className="mb-0">Kuliah</h5>
                <hr />
                <dl className="row">
                  <dt className="col-sm-6">Nama Perguruan Tinggi</dt>
                  <dd className="col-sm-8 mb-4">{item.nama_perguruan_tinggi_tgl}</dd>

                  <dt className="col-sm-6">Alamat Perguruan Tinggi</dt>
                  <dd className="col-sm-8 mb-4">{item.alamat_perguruan_tinggi_tgl}</dd>

                  <dt className="col-sm-6">Kota Perguruan Tinggi</dt>
                  <dd className="col-sm-8 mb-4">{item.kota_perguruan_tinggi_tgl}</dd>

                  <dt className="col-sm-6">Jurusan</dt>
                  <dd className="col-sm-8 mb-4">{item.jurusan_perguruan_tinggi_tgl}</dd>

                  <dt className="col-sm-6">Jenjang Pendidikan</dt>
                  <dd className="col-sm-8 mb-4">{item.jenjang_pendidikan_tgl}</dd>
                </dl>

                <h5 className="mb-0">Kerja</h5>
                <hr />
                <dl className="row">
                  <dt className="col-sm-6">Nama Perusahaan</dt>
                  <dd className="col-sm-8 mb-3">{item.nama_perusahaan_tgl}</dd>

                  <dt className="col-sm-6">Alamat Perusahaan</dt>
                  <dd className="col-sm-8 mb-3">{item.alamat_perusahaan_tgl}</dd>
                  
                  <dt className="col-sm-6">Kota</dt>
                  <dd className="col-sm-8 mb-3">{item.kota_perusahaan_tgl}</dd>

                  <dt className="col-sm-6">Nama HRD Perusahaan</dt>
                  <dd className="col-sm-8 mb-3">{item.nama_hrd_perusahaan_tgl}</dd>

                  <dt className="col-sm-6">No Telepon HRD</dt>
                  <dd className="col-sm-8 mb-3">{item.no_telp_hrd_perusahaan_tgl}</dd>

                  <dt className="col-sm-6">Tahun Mulai Kerja</dt>
                  <dd className="col-sm-8 mb-5">{item.tahun_mulai_bekerja_tgl}</dd>
                </dl>


                <h5 className="mb-0">Kuliah dan Kerja</h5>
                <hr />
                <dl className="row">
                  <dt className="col-sm-6">Nama Perguruan Tinggi</dt>
                  <dd className="col-sm-8 mb-3">{item.nama_perguruan_tinggi}</dd>

                  <dt className="col-sm-6">Alamat Perguruan Tinggi</dt>
                  <dd className="col-sm-8 mb-3">{item.alamat_perguruan_tinggi}</dd>

                  <dt className="col-sm-6">Kota Perguruan Tinggi</dt>
                  <dd className="col-sm-8 mb-3">{item.kota_perguruan_tinggi}</dd>

                  <dt className="col-sm-6">Jurusan Perguruan Tinggi</dt>
                  <dd className="col-sm-8 mb-3">{item.jurusan_perguruan_tinggi}</dd>

                  <dt className="col-sm-6">Jenjang Pendidikan</dt>
                  <dd className="col-sm-8 mb-3">{item.jenjang_pendidikan}</dd>

                  <dt className="col-sm-6">Nama Perusahaan</dt>
                  <dd className="col-sm-8 mb-3">{item.nama_perusahaan}</dd>

                  <dt className="col-sm-6">Alamat Perusahaan</dt>
                  <dd className="col-sm-8 mb-3">{item.alamat_perusahaan}</dd>

                  <dt className="col-sm-6">Kota Perusahaan</dt>
                  <dd className="col-sm-8 mb-3">{item.kota_perusahaan}</dd>

                  <dt className="col-sm-6">Nama HRD Perusahaan</dt>
                  <dd className="col-sm-8 mb-3">{item.nama_hrd}</dd>

                  <dt className="col-sm-6">Nomor Telepon HRD</dt>
                  <dd className="col-sm-8 mb-3">{item.no_telp_hrd}</dd>

                  <dt className="col-sm-6">Tahun Mulai Kerja</dt>
                  <dd className="col-sm-8 mb-5">{item.tahun_mulai_bekerja}</dd>
                </dl>

                <h5 className="mb-0">Wirausaha</h5>
                <hr />
                <dl className="row">
                  <dt className="col-sm-6">Nama Usaha</dt>
                  <dd className="col-sm-8 mb-3">{item.nama_usaha}</dd>

                  <dt className="col-sm-6">Bidang Usaha</dt>
                  <dd className="col-sm-8 mb-3">{item.bidang_usaha}</dd>

                  <dt className="col-sm-6">Alamat Usaha</dt>
                  <dd className="col-sm-8 mb-3">{item.alamat_usaha}</dd>

                  <dt className="col-sm-6">Kota Usaha</dt>
                  <dd className="col-sm-8 mb-3">{item.kota_usaha}</dd>

                  <dt className="col-sm-6">No Telepon Usaha</dt>
                  <dd className="col-sm-8 mb-3">{item.no_telp_usaha}</dd>

                  <dt className="col-sm-6">Tahun Mulai Usaha</dt>
                  <dd className="col-sm-8 mb-3">{item.tahun_mulai_usaha}</dd>
                </dl>

                {/* <h5 className="mb-0">Description</h5>
                <hr />
                <p className="lead flex-shrink-0">
                  <small>
                    Nature (TPU case) use environmental non-toxic TPU, silky smooth
                    and ultrathin. Glittering and translucent, arbitrary rue
                    reserved volume button cutouts, easy to operate. Side frosted
                    texture anti-slipping, details show its concern; transparent
                    frosted logo shows its taste. The release of self, the flavor of
                    life. Nillkin launched Nature transparent soft cover, only to
                    retain the original phone style. Subverting tradition,
                    redefinition. Thinner design Environmental texture better hand
                    feeling.
                  </small>
                </p> */}
              </div>
            </div>
          </div>

          {/* <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <RelatedProduct key={i} percentOff={i % 2 === 0 ? 15 : null} />
              );
            })}
          </div>
        </div>
      </div> */}
        </div>
      ))
      }
    </>
  );
}

export default MainPage;

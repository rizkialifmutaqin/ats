import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./admin/Login";
import SecondLogin from "./admin/SecondLogin";

import DataLogin from "./admin/DataLogin";
import TambahLogin from "./admin/TambahLogin";
import EditLogin from "./admin/EditLogin";

import DataSiswa from "./admin/DataSiswa";
import TambahSiswa from "./admin/TambahSiswa";
import EditSiswa from "./admin/EditSiswa";
import UbahPassword from "./admin/UbahPassword";

import DataSiswaKuliah from "./admin/DataSiswaKuliah";
import TambahSiswaKuliah from "./admin/TambahSiswaKuliah";
import EditSiswaKuliah from "./admin/EditSiswaKuliah";

import DataSiswaKerja from "./admin/DataSiswaKerja";
import TambahSiswaKerja from "./admin/TambahSiswaKerja";
import EditSiswaKerja from "./admin/EditSiswaKerja";

import DataSiswaKuliahDanKerja from "./admin/DataSiswaKuliahDanKerja";
import TambahSiswaKuliahDanKerja from "./admin/TambahSiswaKuliahDankerja";
import EditSiswaKuliahDanKerja from "./admin/EditSiswaKuliahDanKerja";

import DataSiswaWirausaha from "./admin/DataSiswaWirausaha";
import TambahSiswaWirausaha from "./admin/TambahSiswaWirausaha";
import EditSiswaWirausaha from "./admin/EditSiswaWirausaha";

import DataSiswaMenganggur from "./admin/DataSiswaMenganggur";

import Template from "./template/Template";

import FormSiswa from "./products/detail/FormSiswa";
import FormKuliah from "./products/detail/FormKuliah";
import FormKerja from "./products/detail/FormKerja";
import FormWirausaha from "./products/detail/FormWirausaha";
import FormKuliahDanKerja from "./products/detail/FormKuliahDanKerja";

import MainPage from "./products/MainPage";


function App() {
  return (
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/isiFormulir" exact>
          <SecondLogin />
        </Route>
        <Route path="/dataLogin" exact>
          <DataLogin />
        </Route>
        <Route path="/dataLogin/tambahLogin" exact>
          <TambahLogin />
        </Route>
        <Route path="/dataLogin/editLogin/:id" exact>
          <EditLogin />
        </Route>

        <Route path="/dataSiswa" exact>
          <DataSiswa />
        </Route>
        <Route path="/dataSiswa/tambahSiswa" exact>
          <TambahSiswa />
        </Route>
        <Route path="/dataSiswa/editSiswa/:id" exact>
          <EditSiswa />
        </Route>

        <Route path="/dataSiswaKuliah" exact>
          <DataSiswaKuliah />
        </Route>
        <Route path="/dataSiswaKuliah/tambahSiswaKuliah" exact>
          <TambahSiswaKuliah />
        </Route>
        <Route path="/dataSiswaKuliah/editSiswaKuliah/:id" exact>
          <EditSiswaKuliah />
        </Route>

        <Route path="/dataSiswaKerja" exact>
          <DataSiswaKerja />
        </Route>
        <Route path="/dataSiswaKerja/tambahSiswaKerja" exact>
          <TambahSiswaKerja />
        </Route>
        <Route path="/dataSiswaKerja/editSiswaKerja/:id" exact>
          <EditSiswaKerja />
        </Route>

        <Route path="/dataSiswaKuliahDanKerja" exact>
          <DataSiswaKuliahDanKerja />
        </Route>
        <Route path="/dataSiswaKuliahDanKerja/tambahSiswaKuliahDanKerja" exact>
          <TambahSiswaKuliahDanKerja />
        </Route>
        <Route path="/dataSiswaKuliahDanKerja/editSiswaKuliahDanKerja/:id" exact>
          <EditSiswaKuliahDanKerja />
        </Route>

        <Route path="/dataSiswaWirausaha" exact>
          <DataSiswaWirausaha />
        </Route>
        <Route path="/dataSiswaWirausaha/tambahSiswaWirausaha" exact>
          <TambahSiswaWirausaha />
        </Route>
        <Route path="/dataSiswaWirausaha/editSiswaWirausaha/:id" exact>
          <EditSiswaWirausaha />
        </Route>

        <Route path="/dataSiswaMenganggur" exact>
          <DataSiswaMenganggur />
        </Route>

        <Route path="/formSiswa">
          <FormSiswa />
        </Route>
        <Route path="/formKuliah">
          <FormKuliah />
        </Route>
        <Route path="/formKerja">
          <FormKerja />
        </Route>
        <Route path="/formWirausaha">
          <FormWirausaha />
        </Route>
        <Route path="/formKuliahDanKerja">
          <FormKuliahDanKerja />
        </Route>
        
        <Route>
          <Template>
            <Switch>
              <Route path="/mainPage">
                <MainPage />
              </Route>
              <Route path="/ubahPassword/:id" exact>
                <UbahPassword />
              </Route>
            </Switch>
          </Template>
        </Route>
     </Switch>
  );
}

export default App;

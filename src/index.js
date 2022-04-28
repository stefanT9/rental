import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthStore from "./store/authStore";
import LoginPage from "./pages/login";
import MyRentalsPage from "./pages/myRentals";
import CarsStore from "./store/carsStore";
import CarsPage from "./pages/cars";
import MyRentalsStore from "./store/myRentalsStore";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Layout from "./pages/layout";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthStore>
        <CarsStore>
          <MyRentalsStore>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route index path="/" element={<MyRentalsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/myRentals" element={<MyRentalsPage />} />
                  <Route path="/cars" element={<CarsPage />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </MyRentalsStore>
        </CarsStore>
      </AuthStore>
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

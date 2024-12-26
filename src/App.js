import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import DataPage from "./components/DataPage/DataPage";
import BackToTop from "./components/BackToTop/BackToTop";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default App;

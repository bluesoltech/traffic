import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home";

function Layout() {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default Layout;

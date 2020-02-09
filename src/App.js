import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Routes from "./routes/routes";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="main-content">
          <Routes />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

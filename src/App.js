import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Routes from "./routes/routes";

const App = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;

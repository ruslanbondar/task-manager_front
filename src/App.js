import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Routes from './routes/routes';

const App = () => {
  return (
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;

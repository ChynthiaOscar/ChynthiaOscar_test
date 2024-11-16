import React, { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import CustomerMenu from './pages/customer_menu';
import Login from './pages/login';
import TransactionPage from './pages/transaction';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Layout>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Layout.Content style={{ marginTop: 64 }}>
          <div style={{ minHeight: '80vh', background: '#fff' }}>
            <Routes>
              <Route path="/" element={<CustomerMenu />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/transaction" element={<TransactionPage />} />
            </Routes>
          </div>
        </Layout.Content>
      </Layout>
    </Router>
  );
};

export default App;
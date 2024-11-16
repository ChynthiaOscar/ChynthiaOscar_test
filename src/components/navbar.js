import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Header style={{ backgroundColor: '#048df0', position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" style={{ float: 'left', color: 'white', fontSize: '18px', fontWeight:'bold', fontSize:'28px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dataku</Link>
      </div>
      <Menu mode="horizontal" style={{ backgroundColor: '#048df0', float: 'right' }}>
        <Menu.Item key="transaction" style={{ float: 'left' }}>
          <Button 
            type="primary" 
            style={{ 
              backgroundColor: '#f2f948', 
              borderColor: '#f2f948', 
              color: '#048df0', 
              fontWeight: 'bold' 
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d9d024'; 
              e.target.style.borderColor = '#d9d024'; 
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f2f948'; 
              e.target.style.borderColor = '#f2f948';
            }}
            onClick={() => navigate('/transaction')}
          >
            Beli Paket Data
          </Button>
        </Menu.Item>
        {isLoggedIn ? (
          <Menu.Item key="logout" style={{ float: 'right' }}>
            <Link 
              to="/" 
              onClick={handleLogout}
              style={{ 
                color: 'white', 
                fontWeight: 'bold', 
                textDecoration: 'none' 
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
                e.target.style.textDecorationColor = '#f2f948';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
              }}
            >
              Logout
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="login" style={{ float: 'right' }}>
            <Link 
              to="/login" 
              style={{ 
                color: 'white', 
                fontWeight: 'bold', 
                textDecoration: 'none' 
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
                e.target.style.textDecorationColor = '#f2f948';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
              }}
            >
              Login
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;

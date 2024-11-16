import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { Input, Button, Form, Card } from 'antd';

const Login = ({ setIsLoggedIn }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/user')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched users:', data);  
        setUsers(data);
        setFadeIn(true);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleLogin = () => {
    console.log('Phone:', phoneNumber, 'Password:', password);  

    const user = users.find(user => user.phone_number === phoneNumber);
    console.log('User found:', user);

    if (user && user.password === password) {
      console.log('Login successful!');
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert('Nomor telepon atau password salah');
      console.log('Login failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'fixed',
        background:'#2ba6ff',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    >
      <Card className="login-card" bordered={false}>
        <h2 className="login-title">
          Selamat datang di Dataku
        </h2>
        <p className="login-description">
          Silahkan login untuk mulai transaksi
        </p>
        <Form style={{ width: '100%' }} onFinish={handleLogin}>
          <Form.Item
            label={<span style={{ fontWeight: 'bold' }}>No Telepon</span>}
            name="phoneNumber"
            rules={[{ required: true, message: 'Masukkan nomor telepon Anda' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            required={false}
          >
            <Input
              placeholder="08xxxxx"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 'bold' }}>Password</span>}
            name="password"
            rules={[{ required: true, message: 'Masukkan Password Anda' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            required={false}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button className="login-button" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

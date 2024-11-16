import React, { useState, useEffect } from 'react';
import { Card, Dropdown, Menu, Button, Row, Col, Divider, notification } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../css/transaction.css';

const TransactionPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('Pilih Paket Internet');
  const [selectedVariant, setSelectedVariant] = useState('Pilih Varian');
  const [fadeIn, setFadeIn] = useState(false);
  const [packages, setPackages] = useState([]);
  const [allVariants, setAllVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [buttonHovered, setButtonHovered] = useState({ ketengan: false });

  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:3000/packages')
      .then(response => response.json())
      .then(data => setPackages(data))
      .catch(error => console.error('Error fetching packages:', error));

    fetch('http://localhost:3000/package_variants')
      .then(response => response.json())
      .then(data => setAllVariants(data))
      .catch(error => console.error('Error fetching package variants:', error));
  }, []);
  
  useEffect(() => {
    if (selectedPackage !== 'Pilih Paket Internet') {
      const packageId = packages.find(pkg => pkg.name === selectedPackage)?.id;
      if (packageId) {
        const filtered = allVariants.filter(variant => variant.package_id === packageId);
        setFilteredVariants(filtered);
      } else {
        setFilteredVariants([]);
      }
      setSelectedVariant('Pilih Varian');
    } else {
      setFilteredVariants([]);
    }
  }, [selectedPackage, packages, allVariants]);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handlePackageSelect = (e) => {
    setSelectedPackage(e.key);
  };

  const handlePayment = () => {
    if (paymentMethod && selectedPackage !== 'Pilih Paket Internet' && selectedVariant !== 'Pilih Varian') {
      notification.success({
        message: 'Transaksi Berhasil',
        description: 'Terima kasih! Transaksi Anda berhasil.',
        placement: 'top',
        duration: 5,
        onClose: () => navigate('/'),
      });
    } else {
      notification.error({
        message: 'Error',
        description: 'Silakan pilih paket, varian, dan metode pembayaran terlebih dahulu.',
        placement: 'top',
        duration: 3,
      });
    }
  };

  const paymentMenu = (
    <Menu onClick={(e) => setPaymentMethod(e.key)}>
      <Menu.Item key="Credit Card">Credit Card</Menu.Item>
      <Menu.Item key="Debit Card">Debit Card</Menu.Item>
      <Menu.Item key="E-Wallet">E-Wallet</Menu.Item>
    </Menu>
  );

  const packageMenu = (
    <Menu onClick={handlePackageSelect}>
      {packages.map(pkg => (
        <Menu.Item key={pkg.name}>{pkg.name}</Menu.Item>
      ))}
    </Menu>
  );

  const variantMenu = (
    <Menu onClick={(e) => setSelectedVariant(e.key)}>
      {filteredVariants.map(variant => (
        <Menu.Item key={variant.var}>
          {variant.var} 
        </Menu.Item>
      ))}
    </Menu>
  );

  const selectedVariantDetails = filteredVariants.find(variant => variant.var === selectedVariant);

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '92vh',
        backgroundColor: '#2ba6ff',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <Card
        bordered={false}
        style={{
          width: '45%',
          boxShadow: '0 0 30px 10px rgba(225, 22166, 255, 0.5)',
          borderRadius: '20px',
          backgroundColor: '#ffffff',
        }}
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <h3 style={{ color: '#2ba6ff', fontSize: '24px' }}>Pilih Paket Internet</h3>
            </Col>
            <Col>
              <Dropdown overlay={packageMenu} trigger={['click']}>
                <Button style={{ width: '250px' }}>
                  {selectedPackage} <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        }
      >
        <Row justify="space-between" align="middle">
          <Col span={12}>
            <span><h4>Varian</h4></span>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Dropdown overlay={variantMenu} trigger={['click']}>
              <Button style={{ width: '50%' }}>
                {selectedVariant} <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>

        <Divider />

        <Row justify="space-between" align="middle">
          <Col>
            <h4>Detail Paket Internet</h4>
          </Col>
        </Row>

        <Row justify="space-between" align="middle">
          <Col>
            <span>Kuota Utama</span>
          </Col>
          <Col>
            <span>{selectedVariantDetails ? selectedVariantDetails.kuota : '-'}</span>
          </Col>
        </Row>

        <Divider />

        <Row justify="space-between" align="middle">
          <Col>
            <span><h4>Metode Pembayaran</h4></span>
          </Col>
          <Col>
            <Dropdown overlay={paymentMenu} trigger={['click']}>
              <Button style={{ width: '250px' }}>
                {paymentMethod ? `${paymentMethod}` : 'Pilih Metode Pembayaran'} <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>

        <Divider />

        <Row justify="center">
          <Col>
            <Button
              type="primary"
              style={{
                width: '200px',
                margin: '0 auto',
                fontSize: '1.2rem',
                padding: '18px 0',
                color: '#FFFFFF',
                background: buttonHovered.ketengan ? '#1a88d1' : '#2ba6ff',
                marginBottom: '5%',
                borderRadius: '20px',
                transition: 'background 0.3s ease',
              }}
              onClick={handlePayment}
              onMouseEnter={() => setButtonHovered((prevState) => ({ ...prevState, ketengan: true }))}
              onMouseLeave={() => setButtonHovered((prevState) => ({ ...prevState, ketengan: false }))}
            >
              Bayar Sekarang
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TransactionPage;

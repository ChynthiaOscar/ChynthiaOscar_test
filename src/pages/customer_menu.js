import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import mainTopImage from '../assets/mainTop.png';
import tfhoursImage from '../assets/24hours.png';
import bestDealImage from '../assets/bestDeal.png';
import discountGiftImage from '../assets/discountGitf.png';
import internetSpeedImage from '../assets/internetSpeed.png';
import '../css/customer_menu.css';
import { Input, Row, Col, Button, Card } from 'antd';

const CustomerMenu = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/user')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleProcessClick = () => {
    const userExists = users.some(user => user.phone_number === phoneNumber);

    if (userExists) {
      navigate('/login', { state: { phoneNumber } });
    } else {
      alert('Nomor telepon tidak ditemukan. Masukkan nomor telepon yang valid.');
    }
  };

  const handleBuyNowClick = () => {
    navigate('/transaction');
  };

  const { ref: mainTopRef, inView: mainTopInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: whyChooseRef, inView: whyChooseInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: findPackageRef, inView: findPackageInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const buttonStyles = {
    width: '50%',
    margin: '0 auto',
    fontSize: '1rem',
    color: '#FFFFFF',
    padding: '4%',
    background: '#2ba6ff',
    marginBottom: '5%',
    borderRadius: '20px',
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <section
        ref={mainTopRef}
        style={{ backgroundColor: '#2ba6ff', marginBottom: '40px' }}
        className={mainTopInView ? 'fadeIn' : ''}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <img
              src={mainTopImage}
              alt="Main Page Image"
              style={{ width: '80%', display: 'block', margin: '0 auto' }}
            />
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginTop: '2%',
            }}
          >
            <h2
              style={{
                color: '#FFFFFF',
                fontSize: '2.8rem',
                fontWeight: 'bold',
                marginBottom: '5%',
                padding: '5%',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.1)',
              }}
            >
              Nikmati berbagai pilihan paket data dengan harga terbaik untuk kebutuhan Internetmu!
            </h2>

            <label
              htmlFor="phone-input"
              style={{ color: '#f2f948', display: 'block', marginBottom: '1%', fontSize: '1.3rem', fontWeight: 'bold' }}
            >
              Masukkan Nomor Telepon
            </label>
            <Input
              id="phone-input"
              style={{ width: '50%', margin: '0 auto', padding: '1%', marginBottom: '1%' }}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Contoh : 08xxxxxx"
              type="tel"
            />
            <Button
              type="primary"
              style={{
                width: '15%',
                margin: '0 auto',
                fontSize: '1.1rem',
                padding: '2.5% 0',
                color: '#2ba6ff',
                backgroundColor: '#f2f948',
                marginBottom: '5%',
                borderRadius: '20px',
                fontWeight: 'bold',
                backgroundColor: '#f2f948',
                color: '#2ba6ff',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#d9d024')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#f2f948')}
              onClick={handleProcessClick}
            >
              Proses
            </Button>
          </Col>
        </Row>
      </section>
      <div style={{ padding: '48px' }}>
        <section
          ref={whyChooseRef}
          style={{
            marginBottom: '40px',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '5%',
          }}
          className={whyChooseInView ? 'fadeInUp' : ''}
        >
          <h2>Mengapa Memilih Kami?</h2>
          <Row gutter={[16, 16]} justify="center" style={{ padding: '2%' }}>
            <Col xs={24} sm={12} md={6}>
              <img
                src={bestDealImage}
                alt="Kelebihan 1"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h2>Harga Terjangkau dan Kompetitif</h2>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <img
                src={tfhoursImage}
                alt="Kelebihan 2"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h2>Kuota Aktif 24 Jam</h2>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <img
                src={internetSpeedImage}
                alt="Kelebihan 3"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h2>Kecepatan Internet Terbaik</h2>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <img
                src={discountGiftImage}
                alt="Kelebihan 4"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h2>Bonus Spesial</h2>
            </Col>
          </Row>
        </section>
      </div>

      <section
        ref={findPackageRef}
        style={{ textAlign: 'center', padding: '5%', fontSize: '1.5rem', background: '#e8f4fb' }}
        className={findPackageInView ? 'fadeInUp' : ''}
      >
        <h2>Temukan Paket Internetmu!</h2>
        <Row gutter={[24, 24]} justify="center" style={{ marginBottom: '2%' }}>
          {[
            { title: 'Paket Internet Harian', subtitle: 'Kuota Internet 2GB/Hari', price: 'Rp 10.000' },
            { title: 'Paket Internet Mingguan', subtitle: 'Kuota Internet 10GB/Minggu', price: 'Rp 45.000' },
            { title: 'Paket Internet Bulanan', subtitle: 'Kuota Internet 15GB/Bulan', price: 'Rp 80.000' },
            { title: 'Paket Internet Nonton Hemat', subtitle: 'Kuota Nonton Seharian', price: 'Rp 30.000' },
            { title: 'Paket Internet Unlimited', subtitle: 'Kuota Unlimited dalam 1 Hari', price: 'Rp 50.000' },
            { title: 'Paket Internet Ketengan', subtitle: 'Kuota Internet 500MB', price: 'Rp 8.000' },
          ].map((pkg, idx) => (
            <Col key={idx} xs={24} sm={12} md={8}>
              <Card
                title={<span style={{ fontSize: '1.3rem', color: '#2ba6ff' }}>{pkg.title}</span>}
                bordered={false}
                className={findPackageInView ? 'fadeInUp' : ''}
              >
                <h2>{pkg.subtitle}</h2>
                <p>Mulai dari {pkg.price}</p>
                <Button
                  type="primary"
                  style={buttonStyles}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#1a83d3')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#2ba6ff')}
                  onClick={handleBuyNowClick}
                >
                  Beli Sekarang
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default CustomerMenu;

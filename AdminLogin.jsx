import React, { useState } from 'react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'thanhnam2002@';

const AdminLogin = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      onLogin(true);
    } else {
      setError('Sai tài khoản hoặc mật khẩu!');
    }
  };

return (
  <form
    onSubmit={handleLogin}
    style={{
      maxWidth: 340,
      margin: '60px auto',
      background: '#b9b7b7ff',
      padding: 32,
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(30,58,138,0.10)',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }}
  >
    <div style={{ textAlign: 'center', marginBottom: 8 }}>
      <span style={{
        display: 'inline-block',
        background: 'linear-gradient(90deg,#1e3a8a 60%,#2563eb 100%)',
        borderRadius: '50%',
        width: 54,
        height: 54,
        lineHeight: '54px',
        fontSize: 28,
        color: '#fff',
        marginBottom: 8
      }}>🔒</span>
      <h2 style={{ color: '#1e3a8a', margin: 0, fontWeight: 700, letterSpacing: 1 }}>Đăng nhập Admin</h2>
    </div>
    <div>
      <label style={{ color: '#1e3a8a', fontWeight: 500, marginBottom: 4, display: 'block' }}>
        <span role="img" aria-label="user">👤</span> Tài khoản
      </label>
      <input
        placeholder="Nhập tài khoản"
        value={user}
        onChange={e => setUser(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          fontSize: 16,
          marginTop: 2
        }}
        autoFocus
      />
    </div>
    <div>
      <label style={{ color: '#1e3a8a', fontWeight: 500, marginBottom: 4, display: 'block' }}>
        <span role="img" aria-label="lock">🔑</span> Mật khẩu
      </label>
      <input
        type="password"
        placeholder="Nhập mật khẩu"
        value={pass}
        onChange={e => setPass(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          fontSize: 16,
          marginTop: 2
        }}
      />
    </div>
    <button
      type="submit"
      style={{
        width: '100%',
        padding: 12,
        background: 'linear-gradient(90deg,#1e3a8a 60%,#2563eb 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 17,
        letterSpacing: 1,
        marginTop: 8,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(30,58,138,0.08)'
      }}
    >
      Đăng nhập
    </button>
    {error && <div style={{ color: '#e11d48', marginTop: 6, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
  </form>
);
};

export default AdminLogin;
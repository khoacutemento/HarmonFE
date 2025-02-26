import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://harmon.love/api/v1/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại!');
      }

      alert('Đăng nhập thành công!');
      console.log('User data:', data);
      window.location.href = '/';
      // Handle successful login, e.g., save token, redirect
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#9C83E7',
      }}>
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#B3A2F3',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}>
        <div>
          <img
            src='public/logo/logo.png'
            alt='Logo'
            style={{ width: '80px', height: '80px' }}
          />
          <h2
            style={{
              marginTop: '10px',
              color: '#4B0082',
              fontStyle: 'italic',
            }}>
            Chào mừng đến với Harmon
          </h2>
        </div>
        <form style={{ marginTop: '20px' }} onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                color: '#4B0082',
                marginBottom: '5px',
              }}>
              Email
            </label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #9C83E7',
                backgroundColor: '#E0D6FF',
              }}
              placeholder='Nhập email'
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#4B0082',
                marginBottom: '5px',
              }}>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #9C83E7',
                backgroundColor: '#E0D6FF',
              }}
              placeholder='Nhập mật khẩu'
              required
            />
          </div>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <button
            type='submit'
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#9C83E7',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

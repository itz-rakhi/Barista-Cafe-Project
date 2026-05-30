import { useState } from 'react';
import $ from 'jquery';

export default function AuthPage({ setPage, setUser }) {
  const [mode, setMode] = useState('login');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setLoading(true);
    $.ajax({
      url: '/api/auth/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username: form.get('username'), password: form.get('password') }),
      success: (data) => {
        setUser(data);
        setMsg(`Welcome back, ${data.username}!`);
        setMsgType('success');
        setTimeout(() => setPage(data.role === 'ADMIN' ? 'admin' : 'home'), 1200);
      },
      error: (xhr) => {
        const err = xhr.responseJSON?.error || 'Invalid credentials';
        setMsg(err);
        setMsgType('error');
      },
      complete: () => setLoading(false)
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    if (form.get('password') !== form.get('confirm')) {
      setMsg('Passwords do not match'); setMsgType('error'); return;
    }
    setLoading(true);
    $.ajax({
      url: '/api/auth/register',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username: form.get('username'), password: form.get('password'), email: form.get('email') }),
      success: () => {
        setMsg('Account created! Please log in.');
        setMsgType('success');
        setMode('login');
      },
      error: (xhr) => {
        setMsg(xhr.responseJSON?.error || 'Registration failed');
        setMsgType('error');
      },
      complete: () => setLoading(false)
    });
  };

  return (
    <div className="auth-container page-enter">
      <div className="auth-card">
        <div className="text-center mb-4">
          <div style={{ fontSize: '2.5rem' }}>☕</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', marginTop: '0.5rem' }}>Barista Cafe</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {/* Tabs */}
        <div className="d-flex mb-4" style={{ background: 'var(--bg2)', borderRadius: 50, padding: 4 }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setMsg(''); }}
              style={{
                flex: 1, border: 'none', borderRadius: 50, padding: '0.5rem',
                background: mode === m ? 'var(--primary)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--text-muted)',
                fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              {m === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <input className="cafe-form-control" name="username" placeholder="Username" required />
            <input className="cafe-form-control" name="password" type="password" placeholder="Password" required />
            <button className="btn-primary-cafe w-100" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input className="cafe-form-control" name="username" placeholder="Username" required />
            <input className="cafe-form-control" name="email" type="email" placeholder="Email Address" required />
            <input className="cafe-form-control" name="password" type="password" placeholder="Password" required />
            <input className="cafe-form-control" name="confirm" type="password" placeholder="Confirm Password" required />
            <button className="btn-accent-cafe w-100" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        {msg && <div className={`cafe-alert cafe-alert-${msgType}`}>{msg}</div>}

        <div className="text-center mt-3">
          <button className="btn-outline-cafe py-1 px-3" style={{ fontSize: '0.85rem' }} onClick={() => setPage('home')}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar({ theme, setTheme, page, setPage, cartCount }) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Order' },
    { id: 'reserve', label: 'Reserve' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="cafe-nav navbar navbar-expand-lg">
      <div className="container">
        <button className="navbar-brand border-0 bg-transparent p-0" onClick={() => setPage('home')}>
          ☕ Barista Cafe
        </button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto gap-1 align-items-lg-center">
            {links.map(l => (
              <li key={l.id} className="nav-item">
                <button
                  className={`nav-link border-0 bg-transparent ${page === l.id ? 'active' : ''}`}
                  onClick={() => setPage(l.id)}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li className="nav-item">
              <button
                className={`nav-link border-0 bg-transparent ${page === 'admin' ? 'active' : ''}`}
                onClick={() => setPage('admin')}
              >
                Admin
              </button>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2 ms-3">
            <button className="btn-outline-cafe py-1 px-3" style={{ fontSize: '0.85rem' }} onClick={() => setPage('order')}>
              🛒 {cartCount > 0 && <span className="badge bg-danger ms-1">{cartCount}</span>}
            </button>
            <button className="btn-theme" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="btn-primary-cafe py-1 px-3" style={{ fontSize: '0.85rem' }} onClick={() => setPage('auth')}>
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

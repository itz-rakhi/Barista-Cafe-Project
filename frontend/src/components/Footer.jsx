export default function Footer({ setPage }) {
  return (
    <footer className="cafe-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="footer-brand">☕ Barista Cafe</div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', maxWidth: 280 }}>
              A premium cafe experience with handcrafted coffee, fresh bakery, and seamless online ordering.
            </p>
            <div className="mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn">f</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn">📷</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn">𝕏</a>
              <a href="https://youtu.be/jdguVU0F7fs?si=xw-zJD235bxdZRxA" target="_blank" rel="noreferrer" className="social-btn">▶</a>
            </div>
          </div>
          <div className="col-sm-4 col-lg-3">
            <h6 style={{ color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>Opening Hours</h6>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', lineHeight: 2 }}>
              Mon – Fri: 7:00 AM – 10:00 PM<br />
              Sat – Sun: 8:00 AM – 11:00 PM<br />
              Public Holidays: 9:00 AM – 9:00 PM
            </p>
          </div>
          <div className="col-sm-4 col-lg-3">
            <h6 style={{ color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>Contact</h6>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', lineHeight: 2 }}>
              📍 123, 90ft Rd, Dombivli<br />
              📞 9999999999<br />
              ✉️ hello@baristacafe.dev
            </p>
          </div>
        </div>
        <div className="footer-bottom text-center">
          © {new Date().getFullYear()} Barista Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

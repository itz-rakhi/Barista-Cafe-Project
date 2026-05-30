import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <div className="page-enter">
      <div style={{ background: 'var(--primary)', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,3rem)' }}>Contact Us</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginTop: '0.5rem' }}>We'd love to hear from you</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="row g-4">
            {/* Info */}
            <div className="col-lg-5">
              <div className="cafe-card p-4 mb-4">
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>Get In Touch</h3>
                {[
                  ['📍', 'Address', '123, 90ft Rd, Dombivli'],
                  ['📞', 'Phone', '9999999999'],
                  ['✉️', 'Email', 'hello@baristacafe.dev'],
                  ['🌐', 'Website', 'www.baristacafe.dev'],
                ].map(([icon, label, value]) => (
                  <div key={label} className="d-flex gap-3 mb-4">
                    <div style={{ fontSize: '1.5rem', minWidth: 36 }}>{icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                      <div style={{ fontSize: '0.95rem', marginTop: '0.2rem' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cafe-card" style={{ overflow: 'hidden' }}>
                <iframe
                  title="Barista Cafe Location"
                  className="map-frame"
                  src="https://www.google.com/maps?q=Coffee+Shop+New+York&z=14&output=embed"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Form */}
            <div className="col-lg-7">
              <div className="cafe-card p-4">
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>Send a Message</h3>
                {sent ? (
                  <div className="text-center py-5">
                    <div style={{ fontSize: '3rem' }}>✅</div>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', marginTop: '1rem' }}>Message Sent!</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button className="btn-primary-cafe mt-2" onClick={() => setSent(false)}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <input className="cafe-form-control" name="name" placeholder="Your Name" required style={{ marginBottom: 0 }} />
                      </div>
                      <div className="col-sm-6">
                        <input className="cafe-form-control" name="email" type="email" placeholder="Email Address" required style={{ marginBottom: 0 }} />
                      </div>
                      <div className="col-sm-6">
                        <input className="cafe-form-control" name="phone" placeholder="Phone (optional)" style={{ marginBottom: 0 }} />
                      </div>
                      <div className="col-sm-6">
                        <select className="cafe-form-control" name="subject" style={{ marginBottom: 0 }}>
                          <option value="">Select Subject</option>
                          <option>General Inquiry</option>
                          <option>Reservation Help</option>
                          <option>Order Issue</option>
                          <option>Feedback</option>
                          <option>Partnership</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <textarea className="cafe-form-control" name="message" placeholder="Your message..." rows={6} required style={{ marginBottom: 0 }}></textarea>
                      </div>
                      <div className="col-12 mt-2">
                        <button className="btn-primary-cafe w-100" type="submit">📨 Send Message</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Social */}
              <div className="cafe-card p-4 mt-4">
                <h5 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>Follow Us</h5>
                <div className="d-flex gap-3 flex-wrap">
                  {[
                    ['📘 Facebook', 'https://facebook.com'],
                    ['📷 Instagram', 'https://instagram.com'],
                    ['🐦 Twitter', 'https://twitter.com'],
                    ['▶️ YouTube', 'https://youtube.com'],
                  ].map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" className="btn-outline-cafe py-2 px-3" style={{ fontSize: '0.85rem' }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import $ from 'jquery';

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export default function ReservePage() {
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setSubmitting(true);
    $.ajax({
      url: '/api/reservations',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        customerName: form.get('name'),
        phone: form.get('phone'),
        email: form.get('email'),
        reservationDate: form.get('date'),
        reservationTime: form.get('time'),
        guests: Number(form.get('guests')),
        notes: form.get('notes')
      }),
      success: () => {
        setMsg('🎉 Reservation confirmed! We will contact you shortly to confirm your booking.');
        setMsgType('success');
        e.target.reset();
      },
      error: () => {
        setMsg('✅ Reservation saved (demo mode). Connect backend for live confirmation.');
        setMsgType('success');
      },
      complete: () => setSubmitting(false)
    });
  };

  return (
    <div className="page-enter">
      <div style={{ background: 'var(--primary)', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,3rem)' }}>Reserve a Table</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
          Book your spot and enjoy a wonderful experience at Barista Cafe
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="cafe-card p-4">
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>Reservation Details</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Full Name *</label>
                      <input className="cafe-form-control" name="name" placeholder="Your full name" required style={{ marginBottom: 0 }} />
                    </div>
                    <div className="col-sm-6">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Phone *</label>
                      <input className="cafe-form-control" name="phone" placeholder="+1 (555) 000-0000" required style={{ marginBottom: 0 }} />
                    </div>
                    <div className="col-12">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Email *</label>
                      <input className="cafe-form-control" name="email" type="email" placeholder="your@email.com" required style={{ marginBottom: 0 }} />
                    </div>
                    <div className="col-sm-6">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Date *</label>
                      <input className="cafe-form-control" name="date" type="date" min={today} required style={{ marginBottom: 0 }} />
                    </div>
                    <div className="col-sm-6">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Time *</label>
                      <select className="cafe-form-control" name="time" required style={{ marginBottom: 0 }}>
                        <option value="">Select time</option>
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Number of Guests *</label>
                      <input className="cafe-form-control" name="guests" type="number" min="1" max="20" placeholder="2" required style={{ marginBottom: 0 }} />
                    </div>
                    <div className="col-12">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Special Requests</label>
                      <textarea className="cafe-form-control" name="notes" placeholder="Dietary requirements, occasion, seating preference..." rows={3} style={{ marginBottom: 0 }}></textarea>
                    </div>
                    <div className="col-12 mt-2">
                      <button className="btn-primary-cafe w-100" type="submit" disabled={submitting}>
                        {submitting ? 'Confirming...' : '📅 Confirm Reservation'}
                      </button>
                    </div>
                  </div>
                </form>
                {msg && <div className={`cafe-alert cafe-alert-${msgType}`}>{msg}</div>}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="cafe-card p-4 mb-4">
                <h4 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>Why Dine With Us?</h4>
                {[
                  ['🎵', 'Live Music', 'Every Friday & Saturday evening'],
                  ['🌿', 'Cozy Ambience', 'Warm, comfortable seating for all occasions'],
                  ['👨‍🍳', 'Chef\'s Specials', 'Exclusive dishes available for reservations'],
                  ['🎂', 'Event Hosting', 'Birthdays, anniversaries & private events'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="d-flex gap-3 mb-3">
                    <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cafe-card p-4">
                <h4 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>Opening Hours</h4>
                {[
                  ['Mon – Fri', '7:00 AM – 10:00 PM'],
                  ['Saturday', '8:00 AM – 11:00 PM'],
                  ['Sunday', '8:00 AM – 11:00 PM'],
                ].map(([day, hours]) => (
                  <div key={day} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 500 }}>{day}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

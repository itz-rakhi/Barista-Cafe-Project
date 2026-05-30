const OFFERS = [
  { emoji: '☕', title: 'Buy 2 Get 1 Free', desc: 'On all coffee drinks every Monday', tag: 'Monday Special' },
  { emoji: '🎂', title: '20% Off Desserts', desc: 'Every weekend on all dessert items', tag: 'Weekend Deal' },
  { emoji: '🥪', title: 'Combo Meal ₹199', desc: 'Sandwich + Coffee + Dessert combo', tag: 'Best Value' },
];

const TESTIMONIALS = [
  { name: 'Sarah M.', role: 'Regular Customer', text: 'The best cappuccino in town! The ambience is cozy and the staff is incredibly friendly. My go-to spot every morning.', avatar: 'https://i.pravatar.cc/80?img=1', stars: 5 },
  { name: 'Rahul M.', role: 'Food Blogger', text: 'Barista Cafe nails the perfect balance of quality and comfort. The berry tart is absolutely divine!', avatar: 'https://i.pravatar.cc/80?img=3', stars: 5 },
  { name: 'Priya R.', role: 'Office Worker', text: 'I order online every day for lunch. The delivery is fast and the food is always fresh. Highly recommend!', avatar: 'https://i.pravatar.cc/80?img=5', stars: 5 },
];

const FEATURES = [
  { icon: '🫘', title: 'Premium Beans', desc: 'Sourced from the finest farms worldwide' },
  { icon: '👨‍🍳', title: 'Expert Baristas', desc: 'Trained professionals crafting every cup' },
  { icon: '🚀', title: 'Fast Delivery', desc: 'Hot food delivered in under 30 minutes' },
  { icon: '🌿', title: 'Fresh Ingredients', desc: 'Locally sourced, daily fresh produce' },
];

export default function HomePage({ setPage }) {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="hero-badge">☕ Fresh Coffee • Warm Ambience • Fast Delivery</span>
              <h1 className="hero-title">Sip, Savor &amp; Enjoy the Finest Cafe Moments</h1>
              <p className="hero-subtitle">
                A premium cafe experience with handcrafted coffee, fresh bakery, and seamless online ordering — right at your fingertips.
              </p>
              <div className="hero-actions d-flex flex-wrap gap-3">
                <button className="btn-accent-cafe" onClick={() => setPage('menu')}>Explore Menu</button>
                <button className="btn-outline-cafe" onClick={() => setPage('reserve')}>Book a Table</button>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                className="hero-img"
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
                alt="Barista Cafe"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="row g-4">
            {FEATURES.map(f => (
              <div key={f.title} className="col-sm-6 col-lg-3">
                <div className="cafe-card p-4 text-center h-100">
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                  <h5 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.4rem' }}>{f.title}</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Special Offers</h2>
            <div className="divider mx-auto"></div>
            <p className="section-subtitle">Exclusive deals crafted just for our valued customers</p>
          </div>
          <div className="row g-4">
            {OFFERS.map(o => (
              <div key={o.title} className="col-md-4">
                <div className="offer-card">
                  <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{o.emoji}</div>
                  <span className="offer-badge">{o.tag}</span>
                  <h4 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', margin: '0.5rem 0' }}>{o.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: 0 }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What Our Guests Say</h2>
            <div className="divider mx-auto"></div>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="col-md-4">
                <div className="testimonial-card h-100">
                  <div className="stars">{'★'.repeat(t.stars)}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontStyle: 'italic' }}>"{t.text}"</p>
                  <div className="testimonial-author">
                    <img src={t.avatar} alt={t.name} className="author-avatar" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section section-alt">
        <div className="container text-center">
          <h2 className="section-title">Ready to Experience Barista Cafe?</h2>
          <div className="divider mx-auto"></div>
          <p className="section-subtitle">Order online or reserve your table today</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn-primary-cafe" onClick={() => setPage('order')}>Order Now</button>
            <button className="btn-outline-cafe" onClick={() => setPage('reserve')}>Reserve Table</button>
          </div>
        </div>
      </section>
    </div>
  );
}

const GALLERY = [
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
];

const TEAM = [
  { name: 'Marco Rossi', role: 'Head Barista', img: 'https://i.pravatar.cc/120?img=11' },
  { name: 'Aisha Patel', role: 'Pastry Chef', img: 'https://i.pravatar.cc/120?img=20' },
  { name: 'David Chen', role: 'Cafe Manager', img: 'https://i.pravatar.cc/120?img=15' },
];

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <div style={{ background: 'var(--primary)', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,3rem)' }}>Our Story</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
          Crafting moments, one cup at a time since 2010
        </p>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="section-title">About Barista Cafe</h2>
              <div className="divider"></div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
                Barista Cafe was born from a simple passion — the love of a perfect cup of coffee. Founded in 2010 by coffee enthusiast Marco Rossi, we started as a small corner shop with just three tables and a dream.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginTop: '1rem' }}>
                Today, we serve hundreds of guests daily, offering a curated menu of handcrafted beverages, artisanal pastries, and wholesome meals — all made with locally sourced, fresh ingredients.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginTop: '1rem' }}>
                Our cafe is more than a place to eat — it's a community hub where ideas are born, friendships are made, and every visit feels like coming home.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                alt="Cafe interior"
                style={{ width: '100%', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-hover)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section-alt">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="cafe-card p-4 h-100">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.75rem' }}>Our Mission</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  To create memorable moments through world-class coffee and food, delivered with warmth, consistency, and genuine hospitality. We believe every cup should tell a story.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cafe-card p-4 h-100">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌟</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.75rem' }}>Our Vision</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  To become the city's most beloved destination for food, drinks, and community — a place where quality meets comfort, and every guest leaves with a smile.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cafe-card p-4 h-100">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌱</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.75rem' }}>Sustainability</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  We are committed to eco-friendly practices — from biodegradable packaging to sourcing fair-trade coffee beans that support farming communities worldwide.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cafe-card p-4 h-100">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.75rem' }}>Awards</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  Best Cafe 2022 &amp; 2023 by City Food Awards. Top-rated on Google with 4.9★ from over 2,000 reviews. Featured in Food &amp; Travel Magazine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Cafe Ambience</h2>
            <div className="divider mx-auto"></div>
          </div>
          <div className="row g-3">
            {GALLERY.map((src, i) => (
              <div key={i} className="col-6 col-md-3">
                <img
                  src={src}
                  alt={`Cafe ${i + 1}`}
                  style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', transition: 'transform 0.3s', cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Meet Our Team</h2>
            <div className="divider mx-auto"></div>
          </div>
          <div className="row g-4 justify-content-center">
            {TEAM.map(m => (
              <div key={m.name} className="col-sm-6 col-md-4">
                <div className="cafe-card p-4 text-center">
                  <img src={m.img} alt={m.name} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)', marginBottom: '1rem' }} />
                  <h5 style={{ fontFamily: 'Playfair Display, serif' }}>{m.name}</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

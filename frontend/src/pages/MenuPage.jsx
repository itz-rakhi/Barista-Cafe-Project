import { useState, useMemo } from 'react';

const CATEGORIES = ['All', 'Coffee', 'Tea', 'Desserts', 'Snacks', 'Fast Food'];

export default function MenuPage({ menu, loading, addToCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return menu.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [menu, activeCategory, search]);

  return (
    <div className="page-enter">
      <div style={{ background: 'var(--primary)', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,3rem)' }}>Our Menu</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
          Handcrafted with love
        </p>
      </div>

      <section className="section">
        <div className="container">
          {/* Controls */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div className="filter-tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              className="search-box"
              placeholder="🔍 Search menu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Loading */}
          {loading && <div className="spinner-cafe"></div>}

          {/* Grid */}
          {!loading && (
            <>
              {filtered.length === 0 ? (
                <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '3rem' }}>☕</div>
                  <p className="mt-2">No items found. Try a different search or category.</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filtered.map(item => (
                    <div key={item.id} className="col-sm-6 col-lg-4">
                      <div className="cafe-card h-100">
                        <div style={{ overflow: 'hidden' }}>
                          <img src={item.image} alt={item.name} className="menu-card-img" />
                        </div>
                        <div className="menu-card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 style={{ fontFamily: 'Playfair Display, serif', margin: 0 }}>{item.name}</h5>
                            <span className="price-tag">${item.price.toFixed(2)}</span>
                          </div>
                          <span className="category-badge mb-2 d-inline-block">{item.category}</span>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>{item.description}</p>
                          <button className="btn-primary-cafe w-100" onClick={() => addToCart(item)}>
                            + Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1.5rem', textAlign: 'right' }}>
                Showing {filtered.length} of {menu.length} items
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

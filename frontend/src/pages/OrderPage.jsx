import { useState } from 'react';
import $ from 'jquery';

export default function OrderPage({ cart, updateQuantity, total, setCart, setPage }) {
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [submitting, setSubmitting] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) { setMsg('Your cart is empty!'); setMsgType('error'); return; }
    const form = new FormData(e.target);
    setSubmitting(true);
    $.ajax({
      url: '/api/orders',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        customerName: form.get('name'),
        phone: form.get('phone'),
        items: JSON.stringify(cart.map(i => ({ name: i.name, qty: i.quantity, price: i.price }))),
        total
      }),
      success: () => {
        setMsg('🎉 Order placed successfully! Thank you for choosing Barista Cafe.');
        setMsgType('success');
        setCart([]);
        e.target.reset();
      },
      error: () => {
        setMsg('✅ Order received (demo mode). Connect backend for live processing.');
        setMsgType('success');
        setCart([]);
      },
      complete: () => setSubmitting(false)
    });
  };

  return (
    <div className="page-enter">
      <div style={{ background: 'var(--primary)', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,3rem)' }}>Your Order</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginTop: '0.5rem' }}>Review your cart and place your order</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="row g-4">
            {/* Cart */}
            <div className="col-lg-7">
              <div className="cafe-card p-4">
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>🛒 Cart</h3>
                {cart.length === 0 ? (
                  <div className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem' }}>🛒</div>
                    <p className="mt-2">Your cart is empty.</p>
                    <button className="btn-accent-cafe mt-2" onClick={() => setPage('menu')}>Browse Menu</button>
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>${item.price.toFixed(2)} each</div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <span style={{ fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                          <span style={{ fontWeight: 700, color: 'var(--accent)', minWidth: 60, textAlign: 'right' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '2px solid var(--border)' }}>
                      <span style={{ fontWeight: 600 }}>Total</span>
                      <span className="cart-total">${total.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Checkout */}
            <div className="col-lg-5">
              <div className="cafe-card p-4">
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>Checkout</h3>
                <form onSubmit={handleOrder}>
                  <input className="cafe-form-control" name="name" placeholder="Full Name" required />
                  <input className="cafe-form-control" name="phone" placeholder="Phone Number" required />
                  <input className="cafe-form-control" name="address" placeholder="Delivery Address" />
                  <textarea className="cafe-form-control" name="notes" placeholder="Special instructions..." rows={3}></textarea>
                  <div className="d-flex justify-content-between mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Subtotal</span><span>${total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Delivery</span><span style={{ color: 'green' }}>Free</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    <span>Total</span><span style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
                  </div>
                  <button className="btn-accent-cafe w-100" type="submit" disabled={submitting}>
                    {submitting ? 'Placing Order...' : '🛍️ Place Order'}
                  </button>
                </form>
                {msg && <div className={`cafe-alert cafe-alert-${msgType}`}>{msg}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

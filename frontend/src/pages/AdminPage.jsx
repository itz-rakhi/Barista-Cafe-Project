import { useState, useEffect } from 'react';
import $ from 'jquery';

const EMPTY_ITEM = { name: '', category: 'Coffee', price: '', description: '', image: '' };
const CATEGORIES = ['Coffee', 'Tea', 'Desserts', 'Snacks', 'Fast Food'];

export default function AdminPage({ menu, setMenu, user, setPage }) {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState(EMPTY_ITEM);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    $.ajax({ url: '/api/admin/stats', success: setStats, error: () => setStats({ menuItems: menu.length, orders: 0, reservations: 0, users: 0 }) });
    $.ajax({ url: '/api/admin/orders', success: setOrders, error: () => {} });
    $.ajax({ url: '/api/admin/reservations', success: setReservations, error: () => {} });
  }, []);

  const saveItem = (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price) };
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/admin/menu/${editId}` : '/api/admin/menu';
    $.ajax({
      url, method, contentType: 'application/json', data: JSON.stringify(payload),
      success: (saved) => {
        setMenu(prev => editId ? prev.map(i => i.id === editId ? saved : i) : [...prev, saved]);
        setForm(EMPTY_ITEM); setEditId(null);
        setMsg(editId ? 'Item updated.' : 'Item added.');
      },
      error: () => {
        // Demo mode: update local state
        if (editId) {
          setMenu(prev => prev.map(i => i.id === editId ? { ...payload, id: editId } : i));
        } else {
          setMenu(prev => [...prev, { ...payload, id: Date.now() }]);
        }
        setForm(EMPTY_ITEM); setEditId(null);
        setMsg('Saved in demo mode.');
      }
    });
  };

  const deleteItem = (id) => {
    if (!window.confirm('Delete this item?')) return;
    $.ajax({
      url: `/api/admin/menu/${id}`, method: 'DELETE',
      success: () => setMenu(prev => prev.filter(i => i.id !== id)),
      error: () => setMenu(prev => prev.filter(i => i.id !== id))
    });
  };

  const startEdit = (item) => { setForm({ ...item, price: item.price.toString() }); setEditId(item.id); setTab('menu'); };

  const updateOrderStatus = (id, status) => {
    $.ajax({
      url: `/api/admin/orders/${id}/status`, method: 'PUT', contentType: 'application/json',
      data: JSON.stringify({ status }),
      success: (updated) => setOrders(prev => prev.map(o => o.id === id ? updated : o)),
      error: () => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    });
  };

  const TABS = ['stats', 'menu', 'orders', 'reservations'];

  return (
    <div className="page-enter">
      <div style={{ background: 'var(--primary)', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,3rem)' }}>Admin Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
          {user ? `Welcome, ${user.username}` : 'Manage your cafe operations'}
        </p>
      </div>

      <section className="section">
        <div className="container">
          {/* Tab Nav */}
          <div className="filter-tabs mb-4">
            {TABS.map(t => (
              <button key={t} className={`filter-tab ${tab === t ? 'active' : ''}`} onClick={() => { setTab(t); setMsg(''); }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Stats */}
          {tab === 'stats' && (
            <div className="row g-4">
              {[
                ['🍽️', 'Menu Items', stats.menuItems ?? menu.length],
                ['📦', 'Total Orders', stats.orders ?? 0],
                ['📅', 'Reservations', stats.reservations ?? 0],
                ['👥', 'Users', stats.users ?? 0],
              ].map(([icon, label, val]) => (
                <div key={label} className="col-sm-6 col-lg-3">
                  <div className="stat-card">
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
                    <div className="stat-number">{val}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Menu Management */}
          {tab === 'menu' && (
            <div className="row g-4">
              <div className="col-lg-5">
                <div className="cafe-card p-4">
                  <h4 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem' }}>
                    {editId ? 'Edit Item' : 'Add New Item'}
                  </h4>
                  <form onSubmit={saveItem}>
                    <input className="cafe-form-control" placeholder="Item Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    <select className="cafe-form-control" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input className="cafe-form-control" type="number" step="0.01" placeholder="Price (e.g. 4.50)" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
                    <textarea className="cafe-form-control" placeholder="Description" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required></textarea>
                    <input className="cafe-form-control" placeholder="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
                    <div className="d-flex gap-2">
                      <button className="btn-primary-cafe flex-fill" type="submit">{editId ? 'Update' : 'Add Item'}</button>
                      {editId && <button className="btn-outline-cafe" type="button" onClick={() => { setForm(EMPTY_ITEM); setEditId(null); }}>Cancel</button>}
                    </div>
                  </form>
                  {msg && <div className="cafe-alert cafe-alert-success mt-2">{msg}</div>}
                </div>
              </div>
              <div className="col-lg-7">
                <div className="cafe-card" style={{ overflow: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {menu.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td><span className="category-badge">{item.category}</span></td>
                          <td style={{ color: 'var(--accent)', fontWeight: 700 }}>${item.price.toFixed(2)}</td>
                          <td>
                            <button className="btn-outline-cafe py-1 px-2 me-1" style={{ fontSize: '0.8rem' }} onClick={() => startEdit(item)}>Edit</button>
                            <button className="btn-primary-cafe py-1 px-2" style={{ fontSize: '0.8rem', background: '#dc3545' }} onClick={() => deleteItem(item.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {tab === 'orders' && (
            <div className="cafe-card" style={{ overflow: 'auto' }}>
              {orders.length === 0 ? (
                <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>No orders yet.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr><th>#</th><th>Customer</th><th>Phone</th><th>Total</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td>#{o.id}</td>
                        <td>{o.customerName}</td>
                        <td>{o.phone}</td>
                        <td style={{ color: 'var(--accent)', fontWeight: 700 }}>${o.total?.toFixed(2)}</td>
                        <td>
                          <span style={{ background: o.status === 'Delivered' ? '#d4edda' : o.status === 'Preparing' ? '#fff3cd' : '#cce5ff', color: '#333', borderRadius: 50, padding: '0.2rem 0.7rem', fontSize: '0.8rem', fontWeight: 600 }}>
                            {o.status}
                          </span>
                        </td>
                        <td>
                          <select
                            style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.2rem 0.5rem', color: 'var(--text)', fontSize: '0.8rem' }}
                            value={o.status}
                            onChange={e => updateOrderStatus(o.id, e.target.value)}
                          >
                            {['Received', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Reservations */}
          {tab === 'reservations' && (
            <div className="cafe-card" style={{ overflow: 'auto' }}>
              {reservations.length === 0 ? (
                <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>No reservations yet.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr><th>#</th><th>Name</th><th>Phone</th><th>Date</th><th>Time</th><th>Guests</th><th>Notes</th></tr>
                  </thead>
                  <tbody>
                    {reservations.map(r => (
                      <tr key={r.id}>
                        <td>#{r.id}</td>
                        <td>{r.customerName}</td>
                        <td>{r.phone}</td>
                        <td>{r.reservationDate}</td>
                        <td>{r.reservationTime}</td>
                        <td>{r.guests}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{r.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

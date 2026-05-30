import { useEffect, useMemo, useState } from 'react';
import $ from 'jquery';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import ReservePage from './pages/ReservePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

const FALLBACK_MENU = [
  { id: 1, name: 'Cinnamon Cappuccino', category: 'Coffee', price: 4.50, description: 'Espresso with steamed milk and cinnamon dust.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Velvet Latte', category: 'Coffee', price: 5.20, description: 'Smooth latte with vanilla velvet foam.', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Golden Matcha', category: 'Tea', price: 4.00, description: 'Creamy matcha with golden topping.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Berry Tart', category: 'Desserts', price: 3.80, description: 'Buttery tart filled with fresh berries.', image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'Crispy Chicken Sandwich', category: 'Fast Food', price: 6.50, description: 'Toast, grilled chicken, cheese, and sauce.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' },
  { id: 7, name: 'Masala Chai', category: 'Tea', price: 3.50, description: 'Spiced Indian tea with ginger and cardamom.', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=400&q=80' },
  { id: 8, name: 'Chocolate Lava Cake', category: 'Desserts', price: 5.50, description: 'Warm cake with molten chocolate center.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80' },
  { id: 9, name: 'Classic Burger', category: 'Fast Food', price: 7.50, description: 'Beef patty, lettuce, tomato, and special sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
  { id: 10, name: 'Cold Brew', category: 'Coffee', price: 4.80, description: 'Slow-steeped cold brew, bold and smooth.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80' },
];

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [menu, setMenu] = useState(FALLBACK_MENU);
  const [menuLoading, setMenuLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch menu via AJAX from Spring Boot API
  useEffect(() => {
    $.ajax({
      url: '/api/menu',
      method: 'GET',
      dataType: 'json',
      success: (data) => { if (data?.length) setMenu(data); },
      error: () => {},
      complete: () => setMenuLoading(false)
    });
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(e => e.id === item.id);
      if (existing) return prev.map(e => e.id === item.id ? { ...e, quantity: e.quantity + 1 } : e);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.flatMap(e =>
      e.id === id ? (e.quantity + delta > 0 ? [{ ...e, quantity: e.quantity + delta }] : []) : [e]
    ));
  };

  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const noLayout = page === 'auth';

  const renderPage = () => {
    switch (page) {
      case 'home':      return <HomePage setPage={setPage} />;
      case 'about':     return <AboutPage />;
      case 'menu':      return <MenuPage menu={menu} loading={menuLoading} addToCart={addToCart} />;
      case 'order':     return <OrderPage cart={cart} updateQuantity={updateQuantity} total={total} setCart={setCart} setPage={setPage} />;
      case 'reserve':   return <ReservePage />;
      case 'contact':   return <ContactPage />;
      case 'auth':      return <AuthPage setPage={setPage} setUser={setUser} />;
      case 'admin':     return <AdminPage menu={menu} setMenu={setMenu} user={user} setPage={setPage} />;
      default:          return <HomePage setPage={setPage} />;
    }
  };

  if (noLayout) return renderPage();

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} page={page} setPage={setPage} cartCount={cartCount} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
    </>
  );
}

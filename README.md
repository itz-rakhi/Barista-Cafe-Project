# ☕ Barista Cafe — Full-Stack Cafe Website

A modern, responsive, full-stack cafe management website built with **Spring Boot + Hibernate** (backend) and **React + Bootstrap + jQuery + AJAX** (frontend).

---

## 🏗️ Project Structure

```
barista cafe/
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/com/baristacafe/
│   │   ├── controller/
│   │   │   ├── CafeController.java     # Public API endpoints + data seeding
│   │   │   └── AdminController.java    # Admin CRUD + Auth endpoints
│   │   ├── model/
│   │   │   ├── MenuItem.java           # Hibernate entity
│   │   │   ├── Order.java              # Hibernate entity
│   │   │   ├── Reservation.java        # Hibernate entity
│   │   │   └── User.java               # Hibernate entity
│   │   ├── repository/
│   │   │   ├── MenuItemRepository.java
│   │   │   ├── OrderRepository.java
│   │   │   ├── ReservationRepository.java
│   │   │   └── UserRepository.java
│   │   └── BaristaCafeApplication.java
│   ├── src/main/resources/
│   │   └── application.properties      # H2 (dev) / MySQL (prod) config
│   └── pom.xml
│
└── frontend/                 # React + Vite SPA
    ├── public/
    │   └── menu.xml                    # XML menu catalog
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx            # Hero, offers, testimonials
    │   │   ├── AboutPage.jsx           # Story, mission, gallery, team
    │   │   ├── MenuPage.jsx            # AJAX menu + filter + search
    │   │   ├── OrderPage.jsx           # Cart + checkout
    │   │   ├── ReservePage.jsx         # Table reservation form
    │   │   ├── ContactPage.jsx         # Contact form + Google Maps
    │   │   ├── AuthPage.jsx            # Login + Register
    │   │   └── AdminPage.jsx           # Dashboard + CRUD
    │   ├── App.jsx                     # Root router + state
    │   ├── main.jsx                    # React entry point
    │   └── index.css                   # Coffee-themed CSS + dark mode
    ├── index.html
    ├── package.json
    └── vite.config.js                  # Proxy /api → localhost:8080
```

---

## 🚀 Getting Started

### Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

- Runs on **http://localhost:8080**
- Uses **H2 in-memory database** by default (no setup needed)
- H2 Console: http://localhost:8080/h2-console
- Auto-seeds 16 menu items + admin user on first run

**Switch to MySQL** — update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/baristacafe
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.h2.console.enabled=false
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

- Runs on **http://localhost:3000**
- Proxies `/api` requests to `http://localhost:8080`

---

## 🔑 Default Credentials

| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | admin    | admin123  |

---

## 🌐 API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /api/menu                   | Get all menu items       |
| GET    | /api/health                 | Health check             |
| POST   | /api/reservations           | Create reservation       |
| POST   | /api/orders                 | Place order              |
| POST   | /api/auth/login             | User login               |
| POST   | /api/auth/register          | User registration        |
| GET    | /api/admin/stats            | Dashboard statistics     |
| POST   | /api/admin/menu             | Add menu item            |
| PUT    | /api/admin/menu/{id}        | Update menu item         |
| DELETE | /api/admin/menu/{id}        | Delete menu item         |
| GET    | /api/admin/orders           | All orders               |
| PUT    | /api/admin/orders/{id}/status | Update order status    |
| GET    | /api/admin/reservations     | All reservations         |

---

## ✨ Features

- **Home** — Hero banner, special offers, testimonials, CTA
- **About** — Cafe story, mission/vision, gallery, team
- **Menu** — 16 items across 5 categories, AJAX-loaded, search + filter
- **Order** — Add to cart, quantity management, checkout via AJAX
- **Reserve** — Table booking form, stored via Hibernate
- **Contact** — Contact form, Google Maps embed, social links
- **Auth** — Login / Register with session state
- **Admin** — Stats dashboard, menu CRUD, order status management, reservations view
- **Dark/Light Theme** — Toggle with CSS variables
- **Responsive** — Mobile-first Bootstrap 5 grid

---

## 🛠️ Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Backend   | Java 17, Spring Boot 3.2, Hibernate, Spring MVC |
| Database  | H2 (dev), MySQL (prod)                          |
| Frontend  | React 18, Vite, Bootstrap 5, jQuery, AJAX       |
| Data      | JSON (API), XML (menu catalog)                  |
| Styling   | Custom CSS with CSS variables, animations       |

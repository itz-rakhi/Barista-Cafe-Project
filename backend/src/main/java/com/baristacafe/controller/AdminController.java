package com.baristacafe.controller;

import com.baristacafe.model.MenuItem;
import com.baristacafe.model.Order;
import com.baristacafe.model.Reservation;
import com.baristacafe.model.User;
import com.baristacafe.repository.MenuItemRepository;
import com.baristacafe.repository.OrderRepository;
import com.baristacafe.repository.ReservationRepository;
import com.baristacafe.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AdminController {

    private final MenuItemRepository menuRepo;
    private final OrderRepository orderRepo;
    private final ReservationRepository reservationRepo;
    private final UserRepository userRepo;

    public AdminController(MenuItemRepository menuRepo, OrderRepository orderRepo,
                           ReservationRepository reservationRepo, UserRepository userRepo) {
        this.menuRepo = menuRepo;
        this.orderRepo = orderRepo;
        this.reservationRepo = reservationRepo;
        this.userRepo = userRepo;
    }

    // ── Auth ──────────────────────────────────────────────────────────────────

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent())
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        user.setRole("USER");
        return ResponseEntity.ok(userRepo.save(user));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        Optional<User> user = userRepo.findByUsername(creds.get("username"));
        if (user.isPresent() && user.get().getPassword().equals(creds.get("password")))
            return ResponseEntity.ok(Map.of("message", "Login successful", "role", user.get().getRole(), "username", user.get().getUsername()));
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }

    // ── Admin: Menu CRUD ──────────────────────────────────────────────────────

    @PostMapping("/admin/menu")
    public MenuItem addMenuItem(@RequestBody MenuItem item) {
        return menuRepo.save(item);
    }

    @PutMapping("/admin/menu/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem updated) {
        return menuRepo.findById(id).map(item -> {
            item.setName(updated.getName());
            item.setCategory(updated.getCategory());
            item.setPrice(updated.getPrice());
            item.setDescription(updated.getDescription());
            item.setImage(updated.getImage());
            return ResponseEntity.ok(menuRepo.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/menu/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ── Admin: Dashboard stats ────────────────────────────────────────────────

    @GetMapping("/admin/stats")
    public Map<String, Long> stats() {
        return Map.of(
            "menuItems", menuRepo.count(),
            "orders", orderRepo.count(),
            "reservations", reservationRepo.count(),
            "users", userRepo.count()
        );
    }

    @GetMapping("/admin/orders")
    public List<Order> allOrders() { return orderRepo.findAll(); }

    @GetMapping("/admin/reservations")
    public List<Reservation> allReservations() { return reservationRepo.findAll(); }

    @PutMapping("/admin/orders/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return orderRepo.findById(id).map(o -> {
            o.setStatus(body.get("status"));
            return ResponseEntity.ok(orderRepo.save(o));
        }).orElse(ResponseEntity.notFound().build());
    }
}

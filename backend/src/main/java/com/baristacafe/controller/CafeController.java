package com.baristacafe.controller;

import com.baristacafe.model.MenuItem;
import com.baristacafe.model.Order;
import com.baristacafe.model.Reservation;
import com.baristacafe.model.User;
import com.baristacafe.repository.MenuItemRepository;
import com.baristacafe.repository.OrderRepository;
import com.baristacafe.repository.ReservationRepository;
import com.baristacafe.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CafeController {

    private final MenuItemRepository menuItemRepository;
    private final ReservationRepository reservationRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public CafeController(MenuItemRepository menuItemRepository,
                          ReservationRepository reservationRepository,
                          OrderRepository orderRepository,
                          UserRepository userRepository) {
        this.menuItemRepository = menuItemRepository;
        this.reservationRepository = reservationRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void seed() {
        // Seed admin user
        if (userRepository.count() == 0) {
            userRepository.save(new User("admin", "admin123", "admin@baristacafe.dev", "ADMIN"));
        }

        // Seed menu items
        if (menuItemRepository.count() == 0) {
            menuItemRepository.saveAll(List.of(
                // Coffee
                new MenuItem("Cinnamon Cappuccino", "Coffee", 4.50, "Espresso with steamed milk and cinnamon dust.", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Velvet Latte", "Coffee", 5.20, "Smooth latte with vanilla velvet foam.", "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Cold Brew", "Coffee", 4.80, "Slow-steeped cold brew, bold and smooth.", "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Espresso Shot", "Coffee", 2.50, "Pure double espresso, rich and intense.", "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80"),
                // Tea
                new MenuItem("Golden Matcha", "Tea", 4.00, "Creamy matcha with golden topping.", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Masala Chai", "Tea", 3.50, "Spiced Indian tea with ginger and cardamom.", "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Earl Grey", "Tea", 3.20, "Classic bergamot-infused black tea.", "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80"),
                // Desserts
                new MenuItem("Berry Tart", "Desserts", 3.80, "Buttery tart filled with fresh berries.", "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Chocolate Lava Cake", "Desserts", 5.50, "Warm cake with molten chocolate center.", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Tiramisu", "Desserts", 4.90, "Classic Italian coffee-flavored dessert.", "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80"),
                // Snacks
                new MenuItem("Cheese Croissant", "Snacks", 3.50, "Flaky croissant stuffed with melted cheese.", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Granola Bowl", "Snacks", 4.20, "Crunchy granola with yogurt and honey.", "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=400&q=80"),
                // Fast Food
                new MenuItem("Crispy Chicken Sandwich", "Fast Food", 6.50, "Toast, grilled chicken, cheese, and sauce.", "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Classic Burger", "Fast Food", 7.50, "Beef patty, lettuce, tomato, and special sauce.", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"),
                new MenuItem("Loaded Fries", "Fast Food", 4.50, "Crispy fries with cheese sauce and jalapeños.", "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80")
            ));
        }
    }

    @GetMapping("/menu")
    public List<MenuItem> getMenu() {
        return menuItemRepository.findAll();
    }

    @GetMapping("/reservations")
    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping("/reservations")
    public Reservation saveReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @PostMapping("/orders")
    public Order saveOrder(@RequestBody Order order) {
        order.setStatus("Received");
        return orderRepository.save(order);
    }

    @GetMapping("/health")
    public String health() {
        return "Barista Cafe API is running.";
    }
}

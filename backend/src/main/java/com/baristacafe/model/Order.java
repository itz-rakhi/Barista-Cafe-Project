package com.baristacafe.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String phone;
    private String items;
    private Double total;
    private String status;

    public Long getId() { return id; }
    public String getCustomerName() { return customerName; }
    public String getPhone() { return phone; }
    public String getItems() { return items; }
    public Double getTotal() { return total; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setItems(String items) { this.items = items; }
    public void setTotal(Double total) { this.total = total; }
    public void setStatus(String status) { this.status = status; }
}

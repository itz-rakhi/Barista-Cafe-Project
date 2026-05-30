package com.baristacafe.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private Double price;
    private String description;
    private String image;

    public MenuItem() {}

    public MenuItem(String name, String category, Double price, String description, String image) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.image = image;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public Double getPrice() { return price; }
    public String getDescription() { return description; }
    public String getImage() { return image; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setPrice(Double price) { this.price = price; }
    public void setDescription(String description) { this.description = description; }
    public void setImage(String image) { this.image = image; }
}

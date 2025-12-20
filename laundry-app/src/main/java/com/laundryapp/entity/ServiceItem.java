package com.laundryapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "service_items")
public class ServiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;   
    private double price;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceType service;

    public ServiceItem() {}

    public Long getId() {
        return id;
    }

    public String getItemName() {
        return itemName;
    }

    public double getPrice() {
        return price;
    }

    public ServiceType getService() {
        return service;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setService(ServiceType service) {
        this.service = service;
    }
}

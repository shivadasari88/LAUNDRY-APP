
package com.laundryapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_orders") // 'order' is a reserved keyword in SQL
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // "ORD001" logic can be generated in frontend or backend. Storing simple ID for now.
    private String orderDisplayId; 

    private String customerName;
    private String itemsDescription; // e.g. "5 items (Shirt, Pant...)"
    private double amount;
    private String status; // PENDING, PROCESSING, READY, DELIVERED
    
    private LocalDateTime orderTime;

    @Column(name = "shop_id")
    private Long shopId;

    public Order() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrderDisplayId() { return orderDisplayId; }
    public void setOrderDisplayId(String orderDisplayId) { this.orderDisplayId = orderDisplayId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getItemsDescription() { return itemsDescription; }
    public void setItemsDescription(String itemsDescription) { this.itemsDescription = itemsDescription; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getOrderTime() { return orderTime; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }
    public Long getShopId() { return shopId; }
    public void setShopId(Long shopId) { this.shopId = shopId; }
}
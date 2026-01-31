package com.laundryapp.entity;

import java.time.LocalDateTime;

public class OrderHistoryResponse {

    private Long orderId;
    private String shopName;
    private String status;
    private double totalAmount;
    
    // ✅ Added this field for Frontend Display & Sorting
    private LocalDateTime orderTime; 

    public Long getOrderId() {
        return orderId;
    }
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
    public String getShopName() {
        return shopName;
    }
    public void setShopName(String shopName) {
        this.shopName = shopName;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    // ✅ Getters and Setters for orderTime
    public LocalDateTime getOrderTime() {
        return orderTime;
    }
    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }
}
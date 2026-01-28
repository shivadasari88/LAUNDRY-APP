package com.laundryapp.dto;

import java.time.LocalDateTime;

public class NotificationDTO {

    private Long id;
    private Long userId;
    private String userRole;
    private Long orderId;
    private String title;
    private String message;
    private String type;
    private Boolean read=false;
    private LocalDateTime createdAt;

    // ---------- Constructors ----------
    public NotificationDTO() {
    }

    public NotificationDTO(Long id, Long userId, String userRole, Long orderId, String title, String message, String type, boolean read, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.userRole = userRole;
        this.orderId = orderId;
        this.title = title;
        this.message = message;
        this.type = type;
        this.read = read;
        this.createdAt = createdAt;
    }

    // ---------- Getters ----------
    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserRole() {
        return userRole;
    }

    public Long getOrderId() {
        return orderId;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public String getType() {
        return type;
    }

    public Boolean  getRead() {
        return read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // ---------- Setters ----------
    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

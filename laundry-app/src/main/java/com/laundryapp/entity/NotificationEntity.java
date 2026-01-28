package com.laundryapp.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "notifications")
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String userRole;

    private Long orderId;

    private String title;

    private String message;

    private String type;

    @Column(nullable = false)
    private boolean isRead;

    private LocalDateTime createdAt;

    // ---------- Constructors ----------
    public NotificationEntity() {
        this.isRead = false;
        this.createdAt = LocalDateTime.now();
    }

    public NotificationEntity(Long userId, String userRole, Long orderId, String title,
                              String message, String type, boolean isRead, LocalDateTime createdAt) {
        this.userId = userId;
        this.userRole = userRole;
        this.orderId = orderId;
        this.title = title;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
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

    public boolean isRead() {
        return isRead;
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

    public void setRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

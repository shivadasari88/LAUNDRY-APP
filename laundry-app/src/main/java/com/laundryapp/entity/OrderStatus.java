package com.laundryapp.entity;

public enum OrderStatus {
    DRAFT,
    CONFIRMED,
    PICKED_UP,     // 🔥 new (optional but recommended)
    IN_PROGRESS,
    READY,
    DELIVERED,
    CANCELLED
}


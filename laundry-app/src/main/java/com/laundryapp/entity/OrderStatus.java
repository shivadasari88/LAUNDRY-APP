package com.laundryapp.entity;

public enum OrderStatus {
    DRAFT,        // Customer cart
    CONFIRMED,    // Customer placed order
    IN_PROGRESS,  // Provider started processing
    READY,        // Ready for pickup / delivery
    COMPLETED,    // Delivered
    CANCELLED
}


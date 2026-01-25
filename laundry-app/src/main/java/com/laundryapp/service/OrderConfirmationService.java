package com.laundryapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.repository.OrderRepository;

@Service
public class OrderConfirmationService {

    @Autowired
    private OrderRepository orderRepository;

    public Order confirmOrder(Long orderId, Long customerId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // 🔒 Ownership check
        if (!order.getCustomer().getId().equals(customerId)) {
            throw new RuntimeException("Unauthorized order access");
        }

        // 🚫 Status validation
        if (order.getStatus() != OrderStatus.DRAFT) {
            throw new RuntimeException("Order already confirmed");
        }

        // 🚫 Empty cart check
        boolean hasItems = order.getGroups().stream()
                .anyMatch(g -> !g.getItems().isEmpty());

        if (!hasItems) {
            throw new RuntimeException("Cart is empty");
        }

        if (order.getTotalAmount() <= 0) {
            throw new RuntimeException("Invalid order total");
        }

        // ✅ CONFIRM ORDER
        order.setStatus(OrderStatus.CONFIRMED);

        return orderRepository.save(order);
    }
}


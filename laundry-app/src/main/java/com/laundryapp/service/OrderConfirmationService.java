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

    public Order confirmOrder(Long orderId, Long customerId, String pickupAddress,
            String deliveryAddress) {

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

        // 🔄 Recalculate total from items to ensure accuracy (Fixes race conditions)
        double subTotal = order.getGroups().stream()
                .flatMap(g -> g.getItems().stream())
                .mapToDouble(i -> i.getTotalPrice())
                .sum();

        // Application Charges (Must match Frontend CartSidebar.jsx)
        double serviceCharge = 20.0;
        double gst = subTotal * 0.18;

        double finalTotal = subTotal + serviceCharge + gst;

        // Round to 2 decimal places to avoid precision issues
        finalTotal = Math.round(finalTotal * 100.0) / 100.0;

        order.setTotalAmount(finalTotal);

        if (order.getTotalAmount() <= 0) {
            throw new RuntimeException("Invalid order total");
        }

        order.setPickupAddress(pickupAddress);
        order.setDeliveryAddress(
                deliveryAddress != null ? deliveryAddress : pickupAddress);

        // ✅ CONFIRM ORDER
        order.setStatus(OrderStatus.CONFIRMED);

        return orderRepository.save(order);
    }

    public void cancelOrder(Long orderId, Long customerId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getCustomer().getId().equals(customerId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (order.getStatus() != OrderStatus.CONFIRMED) {
            throw new RuntimeException("Only confirmed orders can be cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}

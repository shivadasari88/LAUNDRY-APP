package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.repository.OrderRepository;

@Service
public class ProviderOrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getOrdersForShop(Long shopId) {
        return orderRepository.findByShopIdAndStatusNot(
                shopId,
                OrderStatus.DRAFT
        );
    }
    
    public Order getOrderDetails(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
    
    public Order updateOrderStatus(Long orderId, String newStatus) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus status = OrderStatus.valueOf(newStatus);

        // ❌ Provider cannot move DRAFT orders
        if (order.getStatus() == OrderStatus.DRAFT) {
            throw new RuntimeException("Order not yet confirmed");
        }

        order.setStatus(status);
        return orderRepository.save(order);
    }


}


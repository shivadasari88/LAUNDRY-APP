package com.laundryapp.controller;

import com.laundryapp.entity.Order;
import com.laundryapp.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/provider/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Get all orders for a specific shop
    @GetMapping("/shop/{shopId}")
    public List<Order> getShopOrders(@PathVariable Long shopId) {
        return orderService.getOrdersByShop(shopId);
    }

    // Update status (Accept, Process, Ready, etc.)
    @PutMapping("/{orderId}/status")
    public Order updateStatus(@PathVariable Long orderId, @RequestBody Map<String, String> payload) {
        return orderService.updateOrderStatus(orderId, payload.get("status"));
    }
}
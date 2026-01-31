package com.laundryapp.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderHistoryResponse;
import com.laundryapp.repository.OrderRepository;
import com.laundryapp.service.OrderConfirmationService;

@RestController
@RequestMapping("/api/customer") // ✅ General Base Path
@CrossOrigin("*")
public class CustomerOrderController {

    @Autowired
    private OrderConfirmationService orderConfirmationService;
    
    @Autowired
    private OrderRepository orderRepository; // ✅ Inject Repository

    // 1. Confirm Order (Kept your existing logic)
    @PostMapping("/order/confirm")
    public Order confirmOrder(
            @RequestParam Long orderId,
            @RequestParam Long customerId) {
        return orderConfirmationService.confirmOrder(orderId, customerId);
    }

    // 2. ✅ NEW ENDPOINT: Fetch Order History for Status Page
    // Frontend calls: http://localhost:8080/api/customer/orders/{id}
    @GetMapping("/orders/{customerId}")
    public List<OrderHistoryResponse> getCustomerOrders(@PathVariable Long customerId) {
        
        List<Order> orders = orderRepository.findByCustomerIdOrderByIdDesc(customerId);
        
        return orders.stream().map(order -> {
            OrderHistoryResponse response = new OrderHistoryResponse();
            response.setOrderId(order.getId());
            response.setTotalAmount(order.getTotalAmount());
            response.setStatus(order.getStatus().name());
            response.setOrderTime(order.getOrderTime()); // ✅ Map Time
            
            if (order.getShop() != null) {
                response.setShopName(order.getShop().getName());
            } else {
                response.setShopName("Unknown Shop");
            }
            return response;
        }).collect(Collectors.toList());
    }
}
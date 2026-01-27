package com.laundryapp.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.dto.CartResponse;
import com.laundryapp.dto.InitCartResponse;
import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.repository.OrderRepository;
import com.laundryapp.service.CartViewService;
import com.laundryapp.service.OrderService;

@RestController
@RequestMapping("/api/customer/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private CartViewService cartViewService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/init")
    public InitCartResponse initCart(@RequestParam Long customerId, @RequestParam Long shopId) {
        Order order = orderService.getOrCreateDraftOrder(customerId, shopId);
        InitCartResponse response = new InitCartResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus().name());
        if (order.getShop() != null) {
            response.setShopId(order.getShop().getId());
            response.setShopName(order.getShop().getName());
        }
        return response;
    }
    
    @GetMapping("/view")
    public CartResponse viewCart(@RequestParam Long customerId) {
        return cartViewService.getCart(customerId);
    }

    // ✅ FIXED: Confirm Order
    @PostMapping("/confirm")
    public ResponseEntity<String> confirmCart(
            @RequestParam Long orderId,
            @RequestParam Long customerId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getCustomer().getId().equals(customerId)) {
            return ResponseEntity.status(403).body("Unauthorized access to order");
        }

        // Update status and time
        order.setStatus(OrderStatus.CONFIRMED);
        order.setOrderTime(LocalDateTime.now()); // ✅ This will now work
        
        orderRepository.save(order);

        return ResponseEntity.ok("Order confirmed successfully");
    }
}
package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.dto.ConfirmOrderRequest;
import com.laundryapp.entity.Order;
import com.laundryapp.service.OrderConfirmationService;

@RestController
@RequestMapping("/api/customer/order")
@CrossOrigin("*")
public class CustomerOrderController {

    @Autowired
    private OrderConfirmationService orderConfirmationService;

    @Autowired
    private com.laundryapp.service.CustomerOrderHistoryService customerOrderHistoryService;

    @Autowired
    private com.laundryapp.repository.UserRepository userRepository;

    @PostMapping("/confirm")
    public Order confirmOrder(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails,
            @RequestBody ConfirmOrderRequest request) {

        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());

        return orderConfirmationService.confirmOrder(
                request.getOrderId(),
                user.getId(), // Secure ID
                request.getPickupAddress(),
                request.getDeliveryAddress());
    }

    @org.springframework.web.bind.annotation.GetMapping("/list")
    public java.util.List<com.laundryapp.entity.OrderHistoryResponse> getOrders(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());
        return customerOrderHistoryService.getOrderHistory(user.getId());
    }
}

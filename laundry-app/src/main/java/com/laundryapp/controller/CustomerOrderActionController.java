package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.entity.Order;
import com.laundryapp.service.OrderCancellationService;

@RestController
@RequestMapping("/api/customer/order")
@CrossOrigin("*")
public class CustomerOrderActionController {

    @Autowired
    private OrderCancellationService cancellationService;

    @PostMapping("/cancel")
    public Order cancelOrder(
            @RequestParam Long orderId,
            @RequestParam Long customerId) {

        return cancellationService.cancelOrder(orderId, customerId);
    }
}


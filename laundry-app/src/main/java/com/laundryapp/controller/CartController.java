package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.entity.Order;
import com.laundryapp.service.OrderService;

@RestController
@RequestMapping("/api/customer/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/init")
    public Order initCart(
            @RequestParam Long customerId,
            @RequestParam Long shopId) {

        return orderService.getOrCreateDraftOrder(customerId, shopId);
    }
}


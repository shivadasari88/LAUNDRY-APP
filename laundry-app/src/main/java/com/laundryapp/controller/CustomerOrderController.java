package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @PostMapping("/confirm")
    public Order confirmOrder(@RequestBody ConfirmOrderRequest request) {

        return orderConfirmationService.confirmOrder(
                request.getOrderId(),
                request.getCustomerId(),
                request.getPickupAddress(),
                request.getDeliveryAddress()
        );
    }
}


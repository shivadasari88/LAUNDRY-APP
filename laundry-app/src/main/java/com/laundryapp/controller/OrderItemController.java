package com.laundryapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.laundryapp.dto.AddOrderItemRequest;
import com.laundryapp.entity.OrderItem;
import com.laundryapp.service.OrderItemService;

@RestController
@RequestMapping("/api/customer/cart")
@CrossOrigin("*")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping("/item")
    public OrderItem addItemToCart(@RequestBody AddOrderItemRequest request) {
        return orderItemService.addItem(request);
    }
}


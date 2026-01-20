package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.dto.AddOrderItemRequest;
import com.laundryapp.entity.OrderItem;
import com.laundryapp.service.OrderItemService;

@RestController
@RequestMapping("/api/customer/cart/items")
@CrossOrigin("*")
public class OrderItemController {

    @Autowired
    private OrderItemService itemService;

    @PostMapping
    public OrderItem addItem(@RequestBody AddOrderItemRequest request) {
        return itemService.addItem(request);
    }
}


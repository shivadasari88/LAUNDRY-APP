package com.laundryapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.entity.OrderHistoryResponse;
import com.laundryapp.service.CustomerOrderHistoryService;

@RestController
@RequestMapping("/api/customer/orders")
@CrossOrigin("*")
public class CustomerOrderHistoryController {

    @Autowired
    private CustomerOrderHistoryService historyService;

    @GetMapping
    public List<OrderHistoryResponse> getOrderHistory(
            @RequestParam Long customerId) {

        return historyService.getOrderHistory(customerId);
    }
}


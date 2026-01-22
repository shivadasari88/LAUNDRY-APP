package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.entity.OrderGroup;
import com.laundryapp.service.OrderGroupService;

@RestController
@RequestMapping("/api/customer/cart/groups")
@CrossOrigin("*")
public class OrderGroupController {

    @Autowired
    private OrderGroupService groupService;

    @PostMapping
    public OrderGroup createGroup(
            @RequestParam Long orderId,
            @RequestParam String groupName) {

        return groupService.createGroup(orderId, groupName);
    }
}


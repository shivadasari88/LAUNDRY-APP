package com.laundryapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderGroup;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.repository.OrderGroupRepository;
import com.laundryapp.repository.OrderRepository;

@Service
public class OrderGroupService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderGroupRepository groupRepository;

    public OrderGroup createGroup(Long orderId, String groupName) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.DRAFT) {
            throw new RuntimeException("Cannot modify confirmed order");
        }

        OrderGroup group = new OrderGroup();
        group.setGroupName(groupName);
        group.setOrder(order);
        group.setGroupTotal(0.0);

        return groupRepository.save(group);
    }
}


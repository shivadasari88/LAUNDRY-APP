package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderHistoryResponse;
import com.laundryapp.entity.User;
import com.laundryapp.repository.OrderRepository;
import com.laundryapp.repository.UserRepository;

@Service
public class CustomerOrderHistoryService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public List<OrderHistoryResponse> getOrderHistoryByUsername(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders =
                orderRepository.findByCustomerIdOrderByIdDesc(user.getId());

        return orders.stream().map(order -> {

            OrderHistoryResponse res = new OrderHistoryResponse();
            res.setOrderId(order.getId());
            res.setStatus(order.getStatus().name());
            res.setTotalAmount(order.getTotalAmount());
            res.setShopName(order.getShop().getName());

            return res;
        }).toList();
    }
}



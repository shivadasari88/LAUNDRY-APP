package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderHistoryResponse;
import com.laundryapp.repository.OrderRepository;

@Service
public class CustomerOrderHistoryService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderHistoryResponse> getOrderHistory(Long customerId) {

        List<Order> orders =
                orderRepository.findByCustomerIdOrderByIdDesc(customerId);

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


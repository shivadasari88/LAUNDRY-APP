package com.laundryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByCustomerIdAndStatus(Long customerId, OrderStatus status);

}

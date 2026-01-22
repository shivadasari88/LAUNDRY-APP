package com.laundryapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByCustomerIdAndStatus(Long customerId, OrderStatus status);
}

package com.laundryapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // For Cart Logic
    Optional<Order> findByCustomerIdAndStatus(Long customerId, OrderStatus status);
    
    // For Provider Dashboard
    List<Order> findByShopIdAndStatusNot(Long shopId, OrderStatus status);
    
    // ✅ For Customer Status Page (Newest First)
    List<Order> findByCustomerIdOrderByIdDesc(Long customerId);

}
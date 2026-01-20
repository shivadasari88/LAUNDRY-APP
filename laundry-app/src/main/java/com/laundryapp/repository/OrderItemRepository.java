package com.laundryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundryapp.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByGroupId(Long groupId);
}


package com.laundryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundryapp.entity.OrderGroup;

public interface OrderGroupRepository extends JpaRepository<OrderGroup, Long> {
    List<OrderGroup> findByOrderId(Long orderId);
}


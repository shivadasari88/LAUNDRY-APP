package com.laundryapp.repository;

import com.laundryapp.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByShopIdOrderByOrderTimeDesc(Long shopId);
}
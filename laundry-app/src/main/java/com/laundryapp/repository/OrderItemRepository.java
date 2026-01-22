package com.laundryapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundryapp.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByGroupId(Long groupId);
    
    Optional<OrderItem> findByGroupIdAndItemNameAndServiceTypeAndFabricType(
            Long groupId,
            String itemName,
            String serviceType,
            String fabricType
        );

	List<OrderItem> findAllByGroupIdAndItemNameAndServiceTypeAndFabricType(Long id, String itemName, String serviceType,
			String fabricType);
}


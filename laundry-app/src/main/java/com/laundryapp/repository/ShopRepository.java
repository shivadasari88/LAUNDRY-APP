package com.laundryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundryapp.entity.ApprovalStatus;
import com.laundryapp.entity.Shop;

public interface ShopRepository extends JpaRepository<Shop, Long> {

    boolean existsByProviderId(Long providerId);

    Shop findByProviderId(Long providerId);

    List<Shop> findByApprovalStatus(ApprovalStatus status);
}

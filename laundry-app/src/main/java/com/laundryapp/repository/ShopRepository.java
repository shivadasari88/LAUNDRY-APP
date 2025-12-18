package com.laundryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundryapp.entity.Shop;
import com.laundryapp.entity.User;

public interface ShopRepository extends JpaRepository<Shop, Long> {

    List<Shop> findByProvider(User provider);
}

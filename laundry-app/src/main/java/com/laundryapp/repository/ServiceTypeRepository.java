package com.laundryapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.laundryapp.entity.ServiceType;
import com.laundryapp.entity.Shop;

public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    List<ServiceType> findByShop(Shop shop);
}

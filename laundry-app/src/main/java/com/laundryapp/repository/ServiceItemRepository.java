package com.laundryapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.laundryapp.entity.ServiceItem;
import com.laundryapp.entity.ServiceType;

public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
    List<ServiceItem> findByService(ServiceType service);
}

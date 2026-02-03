package com.laundryapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.laundryapp.entity.NotificationEntity;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findByUserIdAndUserRoleOrderByCreatedAtDesc(Long userId, String userRole);
}
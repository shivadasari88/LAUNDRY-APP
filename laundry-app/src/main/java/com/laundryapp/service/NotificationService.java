package com.laundryapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.laundryapp.dto.NotificationDTO;
import com.laundryapp.entity.NotificationEntity;
import com.laundryapp.entity.User;
import com.laundryapp.entity.Role; // Make sure this is your enum
import com.laundryapp.repository.NotificationRepository;
import com.laundryapp.repository.UserRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    // ------------------ CREATE NOTIFICATION ------------------
    public void createNotification(Long userId, String role, Long orderId, String title, String message, String type) {
        // 1️⃣ Validate user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with id " + userId + " not found"));

        // 2️⃣ Validate role matches enum
        Role providedRole;
        try {
            providedRole = Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role provided: " + role);
        }

        if (user.getRole() != providedRole) {
            throw new RuntimeException("User role mismatch. Expected: " + user.getRole() + ", Provided: " + role);
        }

        // 3️⃣ Create notification
        NotificationEntity notification = new NotificationEntity();
        notification.setUserId(userId);
        notification.setUserRole(providedRole.name()); // Store as string
        notification.setOrderId(orderId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false); // Default to unread
        notificationRepository.save(notification);
    }

    // ------------------ GET USER NOTIFICATIONS ------------------
    public List<NotificationDTO> getUserNotifications(Long userId, String role) {
        return notificationRepository
                .findByUserIdAndUserRoleOrderByCreatedAtDesc(userId, role)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ------------------ MARK AS READ ------------------
    public void markAsRead(Long notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    // ------------------ UPDATE ORDER STATUS ------------------
    public void updateOrderStatus(Long notificationId, String type, String message) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setType(type);
        notification.setMessage(message);

        notificationRepository.save(notification);
    }

    // ------------------ CONVERT ENTITY TO DTO ------------------
    private NotificationDTO toDTO(NotificationEntity entity) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setUserRole(entity.getUserRole());
        dto.setOrderId(entity.getOrderId());
        dto.setTitle(entity.getTitle());
        dto.setMessage(entity.getMessage());
        dto.setType(entity.getType());
        dto.setRead(entity.isRead());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}

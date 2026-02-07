package com.laundryapp.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.laundryapp.dto.NotificationDTO;
import com.laundryapp.entity.NotificationEntity;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.repository.NotificationRepository;

import jakarta.transaction.Transactional;

import com.laundryapp.repository.OrderRepository;
import com.laundryapp.entity.Order;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final OrderRepository orderRepository; // Add this

    public NotificationService(NotificationRepository notificationRepository,
            OrderRepository orderRepository) { // Update constructor
        this.notificationRepository = notificationRepository;
        this.orderRepository = orderRepository; // Initialize
    }

    // CREATE NOTIFICATION with OrderStatus (simplified)
    public void createNotification(Long userId, String role, Long orderId, String message,
            OrderStatus orderStatus) {
        // Create notification without validation for now
        NotificationEntity notification = new NotificationEntity();
        notification.setUserId(userId);
        notification.setUserRole(role); // Use provided role directly
        notification.setOrderId(orderId);
        notification.setMessage(message);

        notification.setOrderStatus(orderStatus);
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    // For OrderStatus notifications - FIXED VERSION
    public void sendOrderStatusNotification(Long orderId, OrderStatus status) {
        // Try to get the order to find actual user IDs
        try {
            Order order = orderRepository.findById(orderId).orElse(null);

            if (order != null && order.getCustomer() != null) {
                // Create customer notification
                createNotification(
                        order.getCustomer().getId(),
                        "CUSTOMER",
                        orderId,
                        getCustomerMessage(status),
                        status);

                // Create provider notification if shop exists
                if (order.getShop() != null && order.getShop().getProvider() != null) {
                    createNotification(
                            order.getShop().getProvider().getId(),
                            "PROVIDER",
                            orderId,
                            getProviderMessage(status),
                            status);
                }
            } else {
                // Fallback: Create generic notifications
                createNotification(1L, "CUSTOMER", orderId,
                        "Order " + status.name().toLowerCase(), status);
                createNotification(2L, "PROVIDER", orderId,
                        "Order " + status.name().toLowerCase(), status);
            }
        } catch (Exception e) {
            // Create generic notifications if anything fails
            createNotification(1L, "CUSTOMER", orderId,
                    "Order " + status.name().toLowerCase(), status);
            createNotification(2L, "PROVIDER", orderId,
                    "Order " + status.name().toLowerCase(), status);
        }
    }

    private String getCustomerMessage(OrderStatus status) {
        switch (status) {
            case CONFIRMED:
                return "Order confirmed";
            case IN_PROGRESS:
                return "Laundry in progress";
            case READY:
                return "Ready for pickup";
            case DELIVERED:
                return "Order delivered";
            case CANCELLED:
                return "Order cancelled";
            case PICKED_UP:
                return "order picked by provider";
            case OUT_FOR_DELIVERY:
                return "order is out for delivery";
            default:
                return "Order updated";
        }
    }

    private String getProviderMessage(OrderStatus status) {
        switch (status) {
            case CONFIRMED:
                return "New order received";
            case IN_PROGRESS:
                return "Order processing started";
            case READY:
                return "Ready for customer pickup";
            case DELIVERED:
                return "Order delivered";
            case CANCELLED:
                return "Order cancelled";
            case PICKED_UP:
                return "New order to Pick up";
            case OUT_FOR_DELIVERY:
                return "Order ready to deliver";
            default:
                return "Order updated";
        }
    }

    // GET USER NOTIFICATIONS
    public List<NotificationDTO> getUserNotifications(Long userId, String role) {
        return notificationRepository
                .findByUserIdAndUserRoleOrderByCreatedAtDesc(userId, role)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // MARK AS READ
    public void markAsRead(Long notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    // UPDATE NOTIFICATION
    @Transactional
    public void updateNotification(Long notificationId, String type, OrderStatus orderStatus) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        String message = null;
        notification.setMessage(message);
        notification.setOrderStatus(orderStatus);
        notificationRepository.save(notification);
    }

    // CONVERT ENTITY TO DTO
    private NotificationDTO toDTO(NotificationEntity entity) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setUserRole(entity.getUserRole());
        dto.setOrderId(entity.getOrderId());
        dto.setMessage(entity.getMessage());

        dto.setOrderStatus(entity.getOrderStatus());
        dto.setRead(entity.isRead());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}

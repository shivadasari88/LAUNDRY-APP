package com.laundryapp.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.laundryapp.dto.NotificationDTO;
import com.laundryapp.service.NotificationService;
import com.laundryapp.entity.OrderStatus;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // POST: Create notification with OrderStatus
    @PostMapping
    public ResponseEntity<String> createNotification(@RequestBody NotificationDTO notificationDTO) {
        notificationService.createNotification(
                notificationDTO.getUserId(),
                notificationDTO.getUserRole(),
                notificationDTO.getOrderId(),
                notificationDTO.getMessage(),
                notificationDTO.getOrderStatus()
        );
        return ResponseEntity.ok("Notification created successfully");
    }

    // POST: Send OrderStatus notification
    @PostMapping("/order/{orderId}/status/{status}")
    public ResponseEntity<String> sendOrderStatusNotification(
            @PathVariable Long orderId,
            @PathVariable String status) {
        try {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            notificationService.sendOrderStatusNotification(orderId, orderStatus);
            return ResponseEntity.ok("Notification sent");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status. Use: DRAFT, CONFIRMED, IN_PROGRESS, READY, COMPLETED, CANCELLED");
        }
    }

    // GET: Fetch notifications for user
    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getNotifications(
            @RequestParam Long userId,
            @RequestParam String role
    ) {
        List<NotificationDTO> notifications = notificationService.getUserNotifications(userId, role);
        return ResponseEntity.ok(notifications);
    }

    // PUT: Mark notification as read
    @PutMapping("/{id}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok("Notification marked as read");
    }
}


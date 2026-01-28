package com.laundryapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.laundryapp.dto.NotificationDTO;
import com.laundryapp.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // POST: Create a notification via JSON
    @PostMapping
    public ResponseEntity<String> createNotification(@RequestBody NotificationDTO notificationDTO) {
        notificationService.createNotification(
                notificationDTO.getUserId(),
                notificationDTO.getUserRole(),
                notificationDTO.getOrderId(),
                notificationDTO.getTitle(),
                notificationDTO.getMessage(),
                notificationDTO.getType()
        );
        return ResponseEntity.ok("Notification created successfully");
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
 // PUT: Update notification for order status
    @PutMapping("/{id}/order-status")
    public ResponseEntity<String> updateOrderStatusNotification(
            @PathVariable Long id,
            @RequestBody NotificationDTO notificationDTO
    ) {
        notificationService.updateOrderStatus(id, notificationDTO.getType(), notificationDTO.getMessage());
        return ResponseEntity.ok("Notification updated successfully");
    }

}

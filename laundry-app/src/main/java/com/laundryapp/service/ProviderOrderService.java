package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.dto.ProviderOrderGroupSummary;
import com.laundryapp.dto.ProviderOrderItemSummary;
import com.laundryapp.dto.ProviderOrderResponse;
import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.repository.OrderRepository;

@Service
public class ProviderOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private NotificationService notificationService;

    public List<ProviderOrderResponse> getOrdersForShop(Long shopId) {

        List<Order> orders = orderRepository.findByShopIdAndStatusNot(
                shopId,
                OrderStatus.DRAFT);

        return orders.stream().map(this::mapToResponse).toList();
    }

    public ProviderOrderResponse getOrderDetails(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToResponse(order);
    }

    @jakarta.transaction.Transactional
    public ProviderOrderResponse updateOrderStatus(
            Long orderId,
            String newStatus) {

        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

            OrderStatus status;
            try {
                status = OrderStatus.valueOf(newStatus.toUpperCase());
            } catch (IllegalArgumentException ex) {
                throw new RuntimeException("Invalid order status: " + newStatus);
            }

            // ❌ Prevent illegal transitions (optional but recommended)
            if (order.getStatus() == OrderStatus.DRAFT) {
                throw new RuntimeException("Cannot update draft order");
            }

            order.setStatus(status);
            Order savedOrder = orderRepository.save(order);

            // 🔔 TRIGGER NOTIFICATION (Safe - won't fail transaction)
            try {
                notificationService.sendOrderStatusNotification(savedOrder.getId(), status);
            } catch (Exception e) {
                System.err.println("Failed to send notification (non-blocking): " + e.getMessage());
                e.printStackTrace();
            }

            return mapToResponse(savedOrder);

        } catch (Exception e) {
            System.err.println("Error updating order status: " + e.getMessage());
            e.printStackTrace();
            throw e; // Rethrow to ensure controller knows about the failure
        }
    }

    private ProviderOrderResponse mapToResponse(Order order) {

        ProviderOrderResponse response = new ProviderOrderResponse();
        response.setOrderId(order.getId());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus().name());

        if (order.getCustomer() != null) {
            response.setCustomerName(order.getCustomer().getUsername());
        } else {
            response.setCustomerName("Unknown Customer");
        }

        if (order.getGroups() != null) {
            List<ProviderOrderGroupSummary> groupResponses = order.getGroups().stream().map(group -> {

                ProviderOrderGroupSummary gr = new ProviderOrderGroupSummary();
                gr.setGroupId(group.getId());
                gr.setGroupName(group.getGroupName());
                gr.setGroupTotal(group.getGroupTotal() != null ? group.getGroupTotal() : 0.0);

                if (group.getPhotos() != null) {
                    gr.setPhotos(group.getPhotos());
                } else {
                    gr.setPhotos(java.util.Collections.emptyList());
                }

                if (group.getItems() != null) {
                    List<ProviderOrderItemSummary> items = group.getItems().stream().map(item -> {

                        ProviderOrderItemSummary ir = new ProviderOrderItemSummary();

                        ir.setItemName(item.getItemName());
                        ir.setServiceType(item.getServiceType());
                        ir.setFabricType(item.getFabricType());
                        ir.setInstructions(item.getInstructions());
                        ir.setQuantity(item.getQuantity());
                        ir.setTotalPrice(item.getTotalPrice());

                        return ir;
                    }).toList();
                    gr.setItems(items);
                } else {
                    gr.setItems(java.util.Collections.emptyList());
                }

                return gr;

            }).toList();
            response.setGroups(groupResponses);
        } else {
            response.setGroups(java.util.Collections.emptyList());
        }

        return response;
    }

}

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

    public List<ProviderOrderResponse> getOrdersForShop(Long shopId) {

        List<Order> orders =
                orderRepository.findByShopIdAndStatusNot(
                        shopId,
                        OrderStatus.DRAFT
                );

        return orders.stream().map(this::mapToResponse).toList();
    }
    
    public ProviderOrderResponse getOrderDetails(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToResponse(order);
    }

    
    public ProviderOrderResponse updateOrderStatus(
            Long orderId,
            String newStatus) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus status;
        try {
            status = OrderStatus.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid order status");
        }

        // ❌ Prevent illegal transitions (optional but recommended)
        if (order.getStatus() == OrderStatus.DRAFT) {
            throw new RuntimeException("Cannot update draft order");
        }

        order.setStatus(status);
        orderRepository.save(order);

        return mapToResponse(order);
    }


    private ProviderOrderResponse mapToResponse(Order order) {

        ProviderOrderResponse response = new ProviderOrderResponse();
        response.setOrderId(order.getId());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus().name());
        response.setCustomerName(order.getCustomer().getUsername());

        List<ProviderOrderGroupSummary> groupResponses =
                order.getGroups().stream().map(group -> {

                    ProviderOrderGroupSummary gr = new ProviderOrderGroupSummary();
                    gr.setGroupId(group.getId());
                    gr.setGroupName(group.getGroupName());
                    gr.setGroupTotal(group.getGroupTotal());

                    List<ProviderOrderItemSummary> items =
                            group.getItems().stream().map(item -> {

                                ProviderOrderItemSummary ir =
                                        new ProviderOrderItemSummary();

                                ir.setItemName(item.getItemName());
                                ir.setServiceType(item.getServiceType());
                                ir.setQuantity(item.getQuantity());
                                ir.setTotalPrice(item.getTotalPrice());

                                return ir;
                            }).toList();

                    gr.setItems(items);
                    return gr;

                }).toList();

        response.setGroups(groupResponses);
        return response;
    }


}



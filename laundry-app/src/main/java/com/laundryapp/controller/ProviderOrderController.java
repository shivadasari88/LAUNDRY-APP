package com.laundryapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.dto.OrderStatusUpdateRequest;
import com.laundryapp.dto.ProviderOrderResponse;
import com.laundryapp.service.ProviderOrderService;

@RestController
@RequestMapping("/api/provider/orders")
@CrossOrigin("*")
public class ProviderOrderController {

    @Autowired
    private ProviderOrderService providerOrderService;

    // ✅ View all orders for shop (summary)
    @GetMapping("/shop/{shopId}")
    public List<ProviderOrderResponse> getOrdersByShop(
            @PathVariable Long shopId) {
        return providerOrderService.getOrdersForShop(shopId);
    }

    // ✅ View single order (detailed, but DTO)
    @GetMapping("/{orderId}")
    public ProviderOrderResponse getOrderDetails(
            @PathVariable Long orderId) {

        return providerOrderService.getOrderDetails(orderId);
    }

    // ✅ Update order status
    @PutMapping("/{orderId}/status")
    public ProviderOrderResponse updateStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatusUpdateRequest request) {

        return providerOrderService.updateOrderStatus(
                orderId,
                request.getStatus());
    }
}

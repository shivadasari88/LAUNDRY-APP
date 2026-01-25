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
import com.laundryapp.entity.Order;
import com.laundryapp.service.ProviderOrderService;

@RestController
@RequestMapping("/api/provider/orders")
@CrossOrigin("*")
public class ProviderOrderController {

    @Autowired
    private ProviderOrderService providerOrderService;

    @GetMapping("/shop/{shopId}")
    public List<Order> getOrdersByShop(@PathVariable Long shopId) {
        return providerOrderService.getOrdersForShop(shopId);
    }
    
    @GetMapping("/{orderId}")
    public Order getOrder(@PathVariable Long orderId) {
        return providerOrderService.getOrderDetails(orderId);
    }
    
    @PutMapping("/{orderId}/status")
    public Order updateStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatusUpdateRequest request) {

        return providerOrderService.updateOrderStatus(
                orderId,
                request.getStatus()
        );
    }


}

package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.dto.CartResponse;
import com.laundryapp.dto.InitCartResponse;
import com.laundryapp.entity.Order;
import com.laundryapp.service.CartViewService;
import com.laundryapp.service.OrderService;

@RestController
@RequestMapping("/api/customer/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private CartViewService cartViewService; // ✅ ADD THIS

    @PostMapping("/init")
    public InitCartResponse initCart(
            @RequestParam Long customerId,
            @RequestParam Long shopId) {

        Order order = orderService.getOrCreateDraftOrder(customerId, shopId);

        InitCartResponse response = new InitCartResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus().name());
        response.setShopId(order.getShop().getId());
        response.setShopName(order.getShop().getName());

        return response;
    }
    
 // ✅ NEW (FRONTEND USES THIS)
    @GetMapping("/view")
    public CartResponse viewCart(Authentication authentication) {

        String username = authentication.getName(); // from JWT

        return cartViewService.getCartByUsername(username);
    }

}


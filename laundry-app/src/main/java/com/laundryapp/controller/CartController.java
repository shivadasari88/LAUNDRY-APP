package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    private CartViewService cartViewService;

    @Autowired
    private com.laundryapp.repository.UserRepository userRepository;

    @PostMapping("/init")
    public InitCartResponse initCart(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails,
            @RequestParam Long shopId) {

        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());
        Order order = orderService.getOrCreateDraftOrder(user.getId(), shopId);

        InitCartResponse response = new InitCartResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus().name());
        response.setShopId(order.getShop().getId());
        response.setShopName(order.getShop().getName());

        return response;
    }

    @GetMapping("/view")
    public CartResponse viewCart(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());
        return cartViewService.getCart(user.getId());
    }

    @org.springframework.transaction.annotation.Transactional
    @org.springframework.web.bind.annotation.DeleteMapping("/clear")
    public void clearCart(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());
        orderService.clearCart(user.getId());
    }

    @PostMapping("/groups")
    public com.laundryapp.dto.GroupResponse createGroup(
            @RequestParam Long orderId,
            @RequestParam String groupName) {
        return orderService.createGroup(orderId, groupName);
    }

    @PostMapping("/item")
    public com.laundryapp.dto.ItemResponse addItem(
            @org.springframework.web.bind.annotation.RequestBody com.laundryapp.dto.AddOrderItemRequest request) {
        return orderService.addOrderItem(request);
    }
}

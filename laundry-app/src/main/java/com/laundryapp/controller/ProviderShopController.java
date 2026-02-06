package com.laundryapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.laundryapp.dto.ShopCreateRequest;
import com.laundryapp.entity.Shop;
import com.laundryapp.service.ShopService;

@RestController
@RequestMapping("/api/provider/shop")
@CrossOrigin("*")
public class ProviderShopController {

    @Autowired
    private ShopService shopService;

    @Autowired
    private com.laundryapp.repository.UserRepository userRepository;

    @PostMapping("/create")
    public Shop createShop(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails,
            @RequestBody ShopCreateRequest request) {

        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());
        request.setProviderId(user.getId()); // Enforce provider ID from token
        return shopService.createShop(request);
    }

    @GetMapping("/my-shop")
    public Shop getMyShop(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());
        return shopService.getShopByProvider(user.getId());
    }
}

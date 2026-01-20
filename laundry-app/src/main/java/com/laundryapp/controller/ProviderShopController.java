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

    @PostMapping("/create")
    public Shop createShop(@RequestBody ShopCreateRequest request) {
        return shopService.createShop(request);
    }

    @GetMapping("/{providerId}")
    public Shop getMyShop(@PathVariable Long providerId) {
        return shopService.getShopByProvider(providerId);
    }
}

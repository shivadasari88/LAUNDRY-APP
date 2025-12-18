package com.laundryapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.laundryapp.dto.ShopRequest;
import com.laundryapp.entity.Shop;
import com.laundryapp.service.ShopService;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin("*")
public class ShopController {

    @Autowired
    private ShopService shopService;

    // Add new shop
    @PostMapping("/add")
    public Shop addShop(@RequestBody ShopRequest request) {
        return shopService.addShop(request);
    }

    // Get all shops of provider
    @GetMapping("/provider/{providerId}")
    public List<Shop> getProviderShops(@PathVariable Long providerId) {
        return shopService.getShopsByProvider(providerId);
    }
}

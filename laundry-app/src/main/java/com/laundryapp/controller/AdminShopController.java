package com.laundryapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.laundryapp.entity.Shop;
import com.laundryapp.service.ShopService;

@RestController
@RequestMapping("/api/admin/shops")
@CrossOrigin("*")
public class AdminShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping("/pending")
    public List<Shop> getPendingShops() {
        return shopService.getPendingShops();
    }

    @PutMapping("/{shopId}/approve")
    public Shop approveShop(@PathVariable Long shopId) {
        return shopService.approveShop(shopId);
    }

    @PutMapping("/{shopId}/reject")
    public Shop rejectShop(@PathVariable Long shopId) {
        return shopService.rejectShop(shopId);
    }
}

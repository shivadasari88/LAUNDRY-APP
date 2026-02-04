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

    // ✅ ADMIN: VIEW ALL SHOPS (APPROVED + PENDING + REJECTED)
    @GetMapping
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    // ✅ ADMIN: VIEW ONLY PENDING SHOPS
    @GetMapping("/pending")
    public List<Shop> getPendingShops() {
        return shopService.getPendingShops();
    }

    // ✅ ADMIN: APPROVE SHOP
    @PutMapping("/{shopId}/approve")
    public Shop approveShop(@PathVariable Long shopId) {
        return shopService.approveShop(shopId);
    }

    // ✅ ADMIN: REJECT SHOP
    @PutMapping("/{shopId}/reject")
    public Shop rejectShop(@PathVariable Long shopId) {
        return shopService.rejectShop(shopId);
    }

    // ✅ ADMIN: VIEW APPROVED SHOPS
    @GetMapping("/approved")
    public List<Shop> getApprovedShops() {
        return shopService.getApprovedShops();
    }

    // ✅ ADMIN: VIEW REJECTED SHOPS
    @GetMapping("/rejected")
    public List<Shop> getRejectedShops() {
        return shopService.getRejectedShops();
    }

    // ✅ ADMIN: GET SHOP BY ID
    @GetMapping("/{shopId}")
    public Shop getShopById(@PathVariable Long shopId) {
        return shopService.getShopById(shopId);
    }
}

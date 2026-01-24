package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.dto.ShopCreateRequest;
import com.laundryapp.entity.ApprovalStatus;
import com.laundryapp.entity.Shop;
import com.laundryapp.entity.User;
import com.laundryapp.repository.ShopRepository;
import com.laundryapp.repository.UserRepository;

@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private UserRepository userRepository;

    // ================= PROVIDER =================

    // Provider creates shop
    public Shop createShop(ShopCreateRequest request) {

        User provider = userRepository.findById(request.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        if (shopRepository.existsByProviderId(provider.getId())) {
            throw new RuntimeException("Provider already has a shop");
        }

        Shop shop = new Shop();
        shop.setName(request.getName());
        shop.setAddress(request.getAddress());
        shop.setPhone(request.getPhone());
        shop.setDescription(request.getDescription());
        shop.setOpeningHours(request.getOpeningHours());
        shop.setDeliveryTime(request.getDeliveryTime());
        shop.setApprovalStatus(ApprovalStatus.PENDING);
        shop.setProvider(provider);

        return shopRepository.save(shop);
    }

    // Provider views own shop
    public Shop getShopByProvider(Long providerId) {

        User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        return shopRepository.findByProviderId(provider.getId());
    }

    // ================= ADMIN =================

    // ✅ Admin views ONLY pending shops
    public List<Shop> getPendingShops() {
        return shopRepository.findByApprovalStatus(ApprovalStatus.PENDING);
    }

    // ✅ Admin views ALL shops (🔥 REQUIRED FOR STEP 7)
    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    // Admin approves shop
    public Shop approveShop(Long shopId) {

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        if (shop.getApprovalStatus() != ApprovalStatus.PENDING) {
            throw new RuntimeException("Shop already processed");
        }

        shop.setApprovalStatus(ApprovalStatus.APPROVED);
        return shopRepository.save(shop);
    }

    // Admin rejects shop
    public Shop rejectShop(Long shopId) {

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        shop.setApprovalStatus(ApprovalStatus.REJECTED);
        return shopRepository.save(shop);
    }
}

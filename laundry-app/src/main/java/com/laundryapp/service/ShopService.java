package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.dto.ShopRequest;
import com.laundryapp.entity.Role;
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

    public Shop addShop(ShopRequest request) {

        User provider = userRepository.findById(request.getProviderId()).orElse(null);

        if (provider == null || provider.getRole() != Role.PROVIDER) {
            return null;
        }

        Shop shop = new Shop();
        shop.setShopName(request.getShopName());
        shop.setAddress(request.getAddress());
        shop.setPhone(request.getPhone());
        shop.setProvider(provider);

        return shopRepository.save(shop);
    }

    public List<Shop> getShopsByProvider(Long providerId) {

        User provider = userRepository.findById(providerId).orElse(null);
        if (provider == null) return null;

        return shopRepository.findByProvider(provider);
    }
}

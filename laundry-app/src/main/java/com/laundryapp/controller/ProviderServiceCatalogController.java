package com.laundryapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.laundryapp.dto.ItemRequest;
import com.laundryapp.dto.ServiceRequest;
import com.laundryapp.entity.ServiceItem;
import com.laundryapp.entity.ServiceType;
import com.laundryapp.service.ServiceCatalogService;

@RestController
@RequestMapping("/api/provider/catalog")
@CrossOrigin("*")
public class ProviderServiceCatalogController {

    @Autowired
    private com.laundryapp.repository.UserRepository userRepository;

    @Autowired
    private com.laundryapp.service.ShopService shopService;

    @Autowired
    private com.laundryapp.repository.ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private ServiceCatalogService serviceCatalogService;

    // ✅ Provider adds a service type (Washing, Ironing, etc.)
    @PostMapping("/services")
    public ServiceType addServiceType(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails,
            @RequestBody ServiceRequest request) {

        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());
        com.laundryapp.entity.Shop shop = shopService.getShopByProvider(user.getId());

        if (shop == null) {
            throw new RuntimeException("Shop not created for this provider");
        }

        request.setShopId(shop.getId());
        return serviceCatalogService.addServiceType(request);
    }

    // ✅ Provider adds an item under a service type
    @PostMapping("/items")
    public ServiceItem addItem(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails,
            @RequestBody ItemRequest request) {

        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());

        // Ownership check
        ServiceType serviceType = serviceTypeRepository.findById(request.getServiceTypeId())
                .orElseThrow(() -> new RuntimeException("Service type not found"));

        if (!serviceType.getShop().getProvider().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: Service type does not belong to your shop");
        }

        return serviceCatalogService.addItem(request);
    }

    // ✅ Get all services of a shop
    @GetMapping("/shop/{shopId}")
    public List<ServiceType> getServicesByShop(@PathVariable Long shopId) {
        return serviceCatalogService.getServiceTypesByShop(shopId);
    }

    // ✅ Get my services (Convenience)
    @GetMapping("/my-services")
    public List<ServiceType> getMyServices(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        com.laundryapp.entity.User user = userRepository.findByUsername(userDetails.getUsername());
        com.laundryapp.entity.Shop shop = shopService.getShopByProvider(user.getId());
        if (shop == null)
            return List.of();
        return serviceCatalogService.getServiceTypesByShop(shop.getId());
    }

    // ✅ Get all items under a service
    @GetMapping("/services/{serviceTypeId}/items")
    public List<ServiceItem> getItemsByService(@PathVariable Long serviceTypeId) {
        return serviceCatalogService.getItemsByServiceType(serviceTypeId);
    }
}

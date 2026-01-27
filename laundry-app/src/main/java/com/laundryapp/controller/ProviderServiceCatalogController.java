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
    private ServiceCatalogService serviceCatalogService;

    // ✅ Provider adds a service type (Washing, Ironing, etc.)
    @PostMapping("/services")
    public ServiceType addServiceType(@RequestBody ServiceRequest request) {
        return serviceCatalogService.addServiceType(request);
    }

    // ✅ Provider adds an item under a service type
    @PostMapping("/items")
    public ServiceItem addItem(@RequestBody ItemRequest request) {
        return serviceCatalogService.addItem(request);
    }

    // ✅ Get all services of a shop
    @GetMapping("/shop/{shopId}/services")
    public List<ServiceType> getServicesByShop(@PathVariable Long shopId) {
        return serviceCatalogService.getServiceTypesByShop(shopId);
    }

    // ✅ Get all items under a service
    @GetMapping("/services/{serviceTypeId}/items")
    public List<ServiceItem> getItemsByService(@PathVariable Long serviceTypeId) {
        return serviceCatalogService.getItemsByServiceType(serviceTypeId);
    }
}

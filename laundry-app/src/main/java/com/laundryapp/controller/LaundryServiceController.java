package com.laundryapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.laundryapp.dto.*;
import com.laundryapp.entity.*;
import com.laundryapp.service.LaundryService;

@RestController
@RequestMapping("/api/laundry")
@CrossOrigin("*")
public class LaundryServiceController {

    @Autowired
    private LaundryService laundryService;

    @PostMapping("/service")
    public ServiceType addService(@RequestBody ServiceRequest request) {
        return laundryService.addService(request);
    }

    @PostMapping("/item")
    public ServiceItem addItem(@RequestBody ItemRequest request) {
        return laundryService.addItem(request);
    }

    @GetMapping("/shop/{shopId}/services")
    public List<ServiceType> getServices(@PathVariable Long shopId) {
        return laundryService.getServicesByShop(shopId);
    }

    @GetMapping("/service/{serviceId}/items")
    public List<ServiceItem> getItems(@PathVariable Long serviceId) {
        return laundryService.getItemsByService(serviceId);
    }
}

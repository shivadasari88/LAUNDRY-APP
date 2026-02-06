package com.laundryapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.entity.ServiceItem;
import com.laundryapp.entity.ServiceType;
import com.laundryapp.entity.Shop;
import com.laundryapp.service.CustomerShopService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
public class CustomerShopController {
	 @Autowired
	    private CustomerShopService customerShopService;

	    // ✅ Browse all approved shops
	    @GetMapping("/shops")
	    public List<Shop> getApprovedShops() {
	        return customerShopService.getApprovedShops();
	    }

	    // ✅ Shop details
	    @GetMapping("/shops/{shopId}")
	    public Shop getShop(@PathVariable Long shopId) {
	        return customerShopService.getShop(shopId);
	    }

	    // ✅ Services of shop
	    @GetMapping("/shops/{shopId}/services")
	    public List<ServiceType> getServices(@PathVariable Long shopId) {
	        return customerShopService.getServices(shopId);
	    }

	    // ✅ Items under service
	    @GetMapping("/services/{serviceId}/items")
	    public List<ServiceItem> getItems(@PathVariable Long serviceId) {
	        return customerShopService.getItems(serviceId);
	    }
	    


}

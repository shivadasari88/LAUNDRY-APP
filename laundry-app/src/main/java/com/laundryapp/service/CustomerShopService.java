package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.entity.ApprovalStatus;
import com.laundryapp.entity.ServiceItem;
import com.laundryapp.entity.ServiceType;
import com.laundryapp.entity.Shop;
import com.laundryapp.repository.ServiceItemRepository;
import com.laundryapp.repository.ServiceTypeRepository;
import com.laundryapp.repository.ShopRepository;

@Service
public class CustomerShopService {

	@Autowired
    private ShopRepository shopRepository;
	
	 @Autowired
	 private ServiceTypeRepository serviceTypeRepository;
	 
	 @Autowired
	 private ServiceItemRepository serviceItemRepository;
	 
	// 1️⃣ All approved shops
	 public List<Shop> getApprovedShops() {
	        return shopRepository.findByApprovalStatus(ApprovalStatus.APPROVED);
	  }
	    
	 // 2️⃣ Shop details
	  public Shop getShop(Long shopId) {
	   return shopRepository.findById(shopId)
	                .orElseThrow(() -> new RuntimeException("Shop not found"));
	    }
	  
	  // 3️⃣ Services of a shop
	    public List<ServiceType> getServices(Long shopId) {
	        Shop shop = getShop(shopId);
	        return serviceTypeRepository.findByShop(shop);
	    }

	    public List<ServiceItem> getItems(Long serviceId) {
	        return serviceItemRepository.findByServiceType_Id(serviceId);
	    }

	  
	  
}

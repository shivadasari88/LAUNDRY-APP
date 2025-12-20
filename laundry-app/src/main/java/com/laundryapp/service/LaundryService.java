package com.laundryapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.dto.ItemRequest;
import com.laundryapp.dto.ServiceRequest;
import com.laundryapp.entity.*;
import com.laundryapp.repository.*;

@Service
public class LaundryService {

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ServiceTypeRepository serviceRepo;

    @Autowired
    private ServiceItemRepository itemRepo;

    public ServiceType addService(ServiceRequest request) {

        Shop shop = shopRepository.findById(request.getShopId()).orElse(null);
        if (shop == null) return null;

        ServiceType service = new ServiceType();
        service.setServiceName(request.getServiceName());
        service.setShop(shop);

        return serviceRepo.save(service);
    }

    public ServiceItem addItem(ItemRequest request) {

        ServiceType service = serviceRepo.findById(request.getServiceId()).orElse(null);
        if (service == null) return null;

        ServiceItem item = new ServiceItem();
        item.setItemName(request.getItemName());
        item.setPrice(request.getPrice());
        item.setService(service);

        return itemRepo.save(item);
    }

    public List<ServiceType> getServicesByShop(Long shopId) {
        Shop shop = shopRepository.findById(shopId).orElse(null);
        return serviceRepo.findByShop(shop);
    }

    public List<ServiceItem> getItemsByService(Long serviceId) {
        ServiceType service = serviceRepo.findById(serviceId).orElse(null);
        return itemRepo.findByService(service);
    }
}

package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.dto.ItemRequest;
import com.laundryapp.dto.ServiceRequest;
import com.laundryapp.entity.*;
import com.laundryapp.repository.*;

@Service
public class ServiceCatalogService {

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private ServiceItemRepository serviceItemRepository;

    // ✅ Add Service Type (Washing, Ironing, etc.)
    public ServiceType addServiceType(ServiceRequest request) {

        Shop shop = shopRepository.findById(request.getShopId())
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        if (shop.getApprovalStatus() != ApprovalStatus.APPROVED) {
            throw new RuntimeException("Shop is not approved by admin");
        }

        ServiceType serviceType = new ServiceType();
        serviceType.setServiceName(request.getServiceName());
        serviceType.setShop(shop);

        return serviceTypeRepository.save(serviceType);
    }

    // ✅ Add Item under Service Type
    public ServiceItem addItem(ItemRequest request) {

        ServiceType serviceType = serviceTypeRepository.findById(request.getServiceTypeId())
                .orElseThrow(() -> new RuntimeException("Service type not found"));

        ServiceItem item = new ServiceItem();
        item.setItemName(request.getItemName());
        item.setCategory(request.getCategory());
        item.setPrice(request.getPrice());
        item.setPopular(request.isPopular());
        item.setServiceType(serviceType);

        return serviceItemRepository.save(item);
    }

    // ✅ Get services by shop
    public List<ServiceType> getServiceTypesByShop(Long shopId) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        return serviceTypeRepository.findByShop(shop);
    }

    // ✅ Get items by service
    public List<ServiceItem> getItemsByServiceType(Long serviceTypeId) {
        ServiceType serviceType = serviceTypeRepository.findById(serviceTypeId)
                .orElseThrow(() -> new RuntimeException("Service type not found"));

        return serviceItemRepository.findByServiceType(serviceType);
    }

    // ✅ Update Service Type
    public ServiceType updateServiceType(Long id, ServiceRequest request) {
        ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service type not found"));

        serviceType.setServiceName(request.getServiceName());
        return serviceTypeRepository.save(serviceType);
    }

    // ✅ Delete Service Type
    public void deleteServiceType(Long id) {
        if (!serviceTypeRepository.existsById(id)) {
            throw new RuntimeException("Service type not found");
        }
        serviceTypeRepository.deleteById(id);
    }

    // ✅ Update Item
    public ServiceItem updateItem(Long id, ItemRequest request) {
        ServiceItem item = serviceItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setItemName(request.getItemName());
        item.setCategory(request.getCategory());
        item.setPrice(request.getPrice());
        item.setPopular(request.isPopular());

        return serviceItemRepository.save(item);
    }

    // ✅ Delete Item
    public void deleteItem(Long id) {
        if (!serviceItemRepository.existsById(id)) {
            throw new RuntimeException("Item not found");
        }
        serviceItemRepository.deleteById(id);
    }
}

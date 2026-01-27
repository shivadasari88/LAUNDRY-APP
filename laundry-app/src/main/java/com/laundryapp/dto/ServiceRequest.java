package com.laundryapp.dto;

public class ServiceRequest {
    private String serviceName;
    private Long shopId;

    public ServiceRequest() {}

    public String getServiceName() {
        return serviceName;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }
}

package com.laundryapp.dto;

public class ItemRequest {
    private String itemName;
    private double price;
    private Long serviceId;

    public ItemRequest() {}

    public String getItemName() {
        return itemName;
    }

    public double getPrice() {
        return price;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
}

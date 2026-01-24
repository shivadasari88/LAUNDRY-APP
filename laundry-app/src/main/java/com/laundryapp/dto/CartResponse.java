package com.laundryapp.dto;

import java.util.List;

public class CartResponse {

    private Long orderId;
    private String orderStatus;
    private Double totalAmount;

    private ShopSummary shop;
    private List<GroupResponse> groups;
    
    
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public ShopSummary getShop() {
		return shop;
	}
	public void setShop(ShopSummary shop) {
		this.shop = shop;
	}
	public List<GroupResponse> getGroups() {
		return groups;
	}
	public void setGroups(List<GroupResponse> groups) {
		this.groups = groups;
	}

    // getters & setters
    
    
}


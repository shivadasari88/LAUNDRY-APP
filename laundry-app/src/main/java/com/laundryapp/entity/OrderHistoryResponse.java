package com.laundryapp.entity;

public class OrderHistoryResponse {

	private Long orderId;
	private String shopName;
	private String status;
	private double totalAmount;

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	private java.util.List<com.laundryapp.dto.ProviderOrderGroupSummary> groups;

	public java.util.List<com.laundryapp.dto.ProviderOrderGroupSummary> getGroups() {
		return groups;
	}

	public void setGroups(java.util.List<com.laundryapp.dto.ProviderOrderGroupSummary> groups) {
		this.groups = groups;
	}

	// getters & setters

}

package com.laundryapp.dto;

import java.util.List;

public class ProviderOrderResponse {

    private Long orderId;
    private String customerName;
    private double totalAmount;
    private String status;
    private List<ProviderOrderGroupSummary> groups;
    
    
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public List<ProviderOrderGroupSummary> getGroups() {
		return groups;
	}
	public void setGroups(List<ProviderOrderGroupSummary> groups) {
		this.groups = groups;
	}
    
    
}


package com.laundryapp.dto;

public class AddOrderItemRequest {
	private Long groupId;
    private String itemName;
    private String serviceType;
    private String fabricType;
    private Integer quantity;
    private String instructions;
	public Long getGroupId() {
		return groupId;
	}
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getFabricType() {
		return fabricType;
	}
	public void setFabricType(String fabricType) {
		this.fabricType = fabricType;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public String getInstructions() {
		return instructions;
	}
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
    
    
}

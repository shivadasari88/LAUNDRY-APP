package com.laundryapp.dto;

import java.util.List;

public class GroupResponse {

    private Long groupId;
    private String groupName;
    private Double groupTotal;
    private List<ItemResponse> items;
    
    
	public Long getGroupId() {
		return groupId;
	}
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public Double getGroupTotal() {
		return groupTotal;
	}
	public void setGroupTotal(Double groupTotal) {
		this.groupTotal = groupTotal;
	}
	public List<ItemResponse> getItems() {
		return items;
	}
	public void setItems(List<ItemResponse> items) {
		this.items = items;
	}

    // getters & setters
    
    
}
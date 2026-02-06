package com.laundryapp.dto;

import java.util.List;

public class ProviderOrderGroupSummary {
	private Long groupId;
	private String groupName;
	private double groupTotal;
	private List<ProviderOrderItemSummary> items;
	private List<String> photos;

	public List<String> getPhotos() {
		return photos;
	}

	public void setPhotos(List<String> photos) {
		this.photos = photos;
	}

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

	public double getGroupTotal() {
		return groupTotal;
	}

	public void setGroupTotal(double groupTotal) {
		this.groupTotal = groupTotal;
	}

	public List<ProviderOrderItemSummary> getItems() {
		return items;
	}

	public void setItems(List<ProviderOrderItemSummary> items) {
		this.items = items;
	}

}

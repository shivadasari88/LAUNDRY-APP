package com.laundryapp.dto;

public class ItemRequest {
	 private Long serviceTypeId;
	    private String itemName;
	    private String category;
	    private double price;
	    private boolean popular;
	    
	    
		public Long getServiceTypeId() {
			return serviceTypeId;
		}
		public void setServiceTypeId(Long serviceTypeId) {
			this.serviceTypeId = serviceTypeId;
		}
		public String getItemName() {
			return itemName;
		}
		public void setItemName(String itemName) {
			this.itemName = itemName;
		}
		public String getCategory() {
			return category;
		}
		public void setCategory(String category) {
			this.category = category;
		}
		public double getPrice() {
			return price;
		}
		public void setPrice(double price) {
			this.price = price;
		}
		public boolean isPopular() {
			return popular;
		}
		public void setPopular(boolean popular) {
			this.popular = popular;
		}
	    
	    
	    
}

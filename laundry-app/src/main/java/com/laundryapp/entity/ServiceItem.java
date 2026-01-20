package com.laundryapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "service_items")
public class ServiceItem {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String itemName;   // ✅ MATCH THIS
	    private String category;   // Men / Women / Home
	    private double price;
	    private boolean popular;

	    @ManyToOne
	    @JoinColumn(name = "service_id", nullable = false)
	    private ServiceType serviceType;

    public ServiceItem() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public ServiceType getServiceType() {
		return serviceType;
	}

	public void setServiceType(ServiceType serviceType) {
		this.serviceType = serviceType;
	}

    
}

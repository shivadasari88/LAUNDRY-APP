package com.laundryapp.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shops")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shop_name")
    private String name;

    private String address;
    private String phone;
    private String description;

    @Column(name = "opening_hours")
    private String openingHours;

    @Column(name = "delivery_time")
    private String deliveryTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status")
    private ApprovalStatus approvalStatus;

    @OneToOne
    @JoinColumn(name = "provider_id", unique = true, nullable = false)
    private User provider;

    // ✅ One Shop → Many ServiceTypes
    @OneToMany(
        mappedBy = "shop",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ServiceType> serviceTypes = new ArrayList<>();

    public Shop() {}

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getOpeningHours() { return openingHours; }
    public void setOpeningHours(String openingHours) { this.openingHours = openingHours; }

    public String getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(String deliveryTime) { this.deliveryTime = deliveryTime; }

    public ApprovalStatus getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(ApprovalStatus approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public User getProvider() { return provider; }
    public void setProvider(User provider) { this.provider = provider; }

    public List<ServiceType> getServiceTypes() { return serviceTypes; }
    public void setServiceTypes(List<ServiceType> serviceTypes) {
        this.serviceTypes = serviceTypes;
    }
}

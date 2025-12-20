package com.laundryapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;

    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;

    public ServiceType() {}

    public Long getId() {
        return id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public Shop getShop() {
        return shop;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }
}

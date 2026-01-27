package com.laundryapp.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_name")
    private String serviceName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    @JsonIgnore
    private Shop shop;

    @OneToMany(
        mappedBy = "serviceType",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonManagedReference
    private List<ServiceItem> items = new ArrayList<>();

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

    public List<ServiceItem> getItems() {
        return items;
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

    public void setItems(List<ServiceItem> items) {
        this.items = items;
    }
}

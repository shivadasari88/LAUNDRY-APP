
package com.laundryapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "shops")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shopName;
    private String address;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private User provider; // PROVIDER user

    public Shop() {}

    public Long getId() {
        return id;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public User getProvider() {
        return provider;
    }

    public void setProvider(User provider) {
        this.provider = provider;
    }
}

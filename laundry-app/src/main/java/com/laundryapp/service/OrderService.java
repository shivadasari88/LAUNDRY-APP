package com.laundryapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.entity.Shop;
import com.laundryapp.entity.User;
import com.laundryapp.repository.OrderRepository;
import com.laundryapp.repository.ShopRepository;
import com.laundryapp.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShopRepository shopRepository;

    public Order getOrCreateDraftOrder(Long customerId, Long shopId) {

        Optional<Order> draftOpt =
                orderRepository.findByCustomerIdAndStatus(customerId, OrderStatus.DRAFT);

        if (draftOpt.isPresent()) {
            Order draft = draftOpt.get();

            // ❌ Prevent mixing shops
            if (!draft.getShop().getId().equals(shopId)) {
                throw new RuntimeException("Cart already contains items from another shop");
            }
            return draft;
        }

        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        Order order = new Order();
        order.setCustomer(customer);
        order.setShop(shop);
        order.setStatus(OrderStatus.DRAFT);
        order.setTotalAmount(0.0);

        return orderRepository.save(order);
    }
}

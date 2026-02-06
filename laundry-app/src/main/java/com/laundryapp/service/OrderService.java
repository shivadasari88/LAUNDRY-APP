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

//... imports

@Service
public class OrderService {

 @Autowired
 private OrderRepository orderRepository;

 @Autowired
 private UserRepository userRepository;

 @Autowired
 private ShopRepository shopRepository;

 public Order getOrCreateDraftOrder(Long customerId, Long shopId) {

     // ✅ CHANGE 1: Look up draft using ID (Long) first.
     // Do NOT fetch the User entity yet. This prevents the "CoercionException".
     Optional<Order> draftOpt = 
             orderRepository.findByCustomerIdAndStatus(customerId, OrderStatus.DRAFT);

     // 2. Validate Shop exists (We need the Shop object for logic below)
     Shop shop = shopRepository.findById(shopId)
             .orElseThrow(() -> new RuntimeException("Shop not found"));

     if (draftOpt.isPresent()) {
         Order draft = draftOpt.get();

         // ✅ Dynamic Shop Switch:
         // If the user has a cart with a different shop, update it to the new shop.
         if (draft.getShop() == null || !draft.getShop().getId().equals(shopId)) {
             System.out.println("Switching Cart Shop to " + shopId);
             draft.setShop(shop); // Link new shop
             draft.getGroups().clear(); // Clear old items
             draft.setTotalAmount(0.0);
             return orderRepository.save(draft);
         }
         return draft;
     }

     // ✅ CHANGE 2: Only fetch the Customer User entity if we actually need to create a NEW order.
     User customer = userRepository.findById(customerId)
             .orElseThrow(() -> new RuntimeException("Customer not found"));

     // 3. Create NEW Order
     Order order = new Order();
     order.setCustomer(customer);
     order.setShop(shop);
     order.setStatus(OrderStatus.DRAFT);
     order.setTotalAmount(0.0);

     return orderRepository.save(order);
 }
}
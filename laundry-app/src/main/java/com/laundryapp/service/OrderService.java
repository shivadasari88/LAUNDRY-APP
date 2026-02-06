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

        Optional<Order> draftOpt = orderRepository.findByCustomerIdAndStatus(customerId, OrderStatus.DRAFT);

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

    public void clearCart(Long customerId) {
        Optional<Order> draftOpt = orderRepository.findByCustomerIdAndStatus(customerId, OrderStatus.DRAFT);

        if (draftOpt.isPresent()) {
            orderRepository.delete(draftOpt.get());
        }
    }

    @Autowired
    private com.laundryapp.repository.OrderGroupRepository orderGroupRepository;

    @Autowired
    private com.laundryapp.repository.OrderItemRepository orderItemRepository;

    public com.laundryapp.dto.GroupResponse createGroup(com.laundryapp.dto.CreateGroupRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        com.laundryapp.entity.OrderGroup group = new com.laundryapp.entity.OrderGroup();
        group.setOrder(order);
        group.setGroupName(request.getGroupName());

        if (request.getPhotos() != null) {
            group.setPhotos(request.getPhotos());
        }

        com.laundryapp.entity.OrderGroup savedGroup = orderGroupRepository.save(group);

        com.laundryapp.dto.GroupResponse response = new com.laundryapp.dto.GroupResponse();
        response.setGroupId(savedGroup.getId());
        response.setGroupName(savedGroup.getGroupName());
        return response;
    }

    public com.laundryapp.dto.ItemResponse addOrderItem(com.laundryapp.dto.AddOrderItemRequest request) {
        com.laundryapp.entity.OrderGroup group = orderGroupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        com.laundryapp.entity.OrderItem item = new com.laundryapp.entity.OrderItem();
        item.setGroup(group);
        item.setItemName(request.getItemName()); // Can be null if using serviceItemId lookup
        item.setServiceType(request.getServiceType());
        item.setFabricType(request.getFabricType());
        item.setQuantity(request.getQuantity());
        item.setInstructions(request.getInstructions());
        item.setPrice(request.getPrice() != null ? request.getPrice() : 0.0);

        // Calculate Total
        item.setTotalPrice(item.getPrice() * item.getQuantity());

        com.laundryapp.entity.OrderItem savedItem = orderItemRepository.save(item);

        // Update Order Total
        Order order = group.getOrder();
        double newTotal = order.getTotalAmount() + savedItem.getTotalPrice();
        order.setTotalAmount(newTotal);
        orderRepository.save(order);

        com.laundryapp.dto.ItemResponse response = new com.laundryapp.dto.ItemResponse();
        response.setItemId(savedItem.getId());
        response.setItemName(savedItem.getItemName());
        response.setQuantity(savedItem.getQuantity());
        response.setTotalPrice(savedItem.getTotalPrice());

        return response;
    }

}

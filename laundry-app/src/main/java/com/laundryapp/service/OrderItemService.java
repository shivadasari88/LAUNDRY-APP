package com.laundryapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.dto.AddOrderItemRequest;
import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderGroup;
import com.laundryapp.entity.OrderItem;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.repository.OrderGroupRepository;
import com.laundryapp.repository.OrderItemRepository;
import com.laundryapp.repository.OrderRepository;

@Service
public class OrderItemService {

    @Autowired
    private OrderGroupRepository groupRepository;

    @Autowired
    private OrderItemRepository itemRepository;

    @Autowired
    private OrderRepository orderRepository;

    // ✅ Pricing logic stays PRIVATE inside service
    private double calculatePrice(String serviceType, int quantity) {

        double basePrice = 30; // Washing base price

        if ("Dry Cleaning".equalsIgnoreCase(serviceType)) {
            basePrice *= 1.5;
        }

        return basePrice * quantity;
    }

    public OrderItem addItem(AddOrderItemRequest request) {

        OrderGroup group = groupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Order order = group.getOrder();

        if (order.getStatus() != OrderStatus.DRAFT) {
            throw new RuntimeException("Order already confirmed");
        }

        double total = calculatePrice(
                request.getServiceType(),
                request.getQuantity()
        );

        OrderItem item = new OrderItem();
        item.setItemName(request.getItemName());
        item.setServiceType(request.getServiceType());
        item.setFabricType(request.getFabricType());
        item.setQuantity(request.getQuantity());
        item.setInstructions(request.getInstructions());
        item.setPrice(total / request.getQuantity());
        item.setTotalPrice(total);
        item.setGroup(group);

        itemRepository.save(item);

        // 🔥 Update totals
        group.setGroupTotal(group.getGroupTotal() + total);
        order.setTotalAmount(order.getTotalAmount() + total);

        groupRepository.save(group);
        orderRepository.save(order);

        return item;
    }
}

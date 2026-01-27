package com.laundryapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.laundryapp.dto.AddOrderItemRequest;
import com.laundryapp.entity.*;
import com.laundryapp.repository.*;

@Service
public class OrderItemService {

    @Autowired
    private OrderGroupRepository groupRepository;

    @Autowired
    private OrderItemRepository itemRepository;

    @Autowired
    private OrderRepository orderRepository;

    // ❌ REMOVED: calculatePrice method (it was hardcoding 30)

    public OrderItem addItem(AddOrderItemRequest request) {

        OrderGroup group = groupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Order order = group.getOrder();

        if (order.getStatus() != OrderStatus.DRAFT) {
            throw new RuntimeException("Order already confirmed");
        }

        // Check for duplicates
        List<OrderItem> existingItems =
                itemRepository.findAllByGroupIdAndItemNameAndServiceTypeAndFabricType(
                        group.getId(),
                        request.getItemName(),
                        request.getServiceType(),
                        request.getFabricType()
                );

        OrderItem item;

        // ✅ USE PRICE FROM REQUEST
        double unitPrice = request.getPrice(); 

        if (!existingItems.isEmpty()) {
            // Update existing item
            item = existingItems.get(0);
            
            // Delete duplicates if any
            for (int i = 1; i < existingItems.size(); i++) {
                itemRepository.delete(existingItems.get(i));
            }

            int newQuantity = item.getQuantity() + request.getQuantity();
            
            item.setQuantity(newQuantity);
            item.setPrice(unitPrice); // Update unit price just in case
            item.setTotalPrice(unitPrice * newQuantity); // ✅ Correct Total

        } else {
            // Create new item
            item = new OrderItem();
            item.setItemName(request.getItemName());
            item.setServiceType(request.getServiceType());
            item.setFabricType(request.getFabricType());
            item.setQuantity(request.getQuantity());
            item.setInstructions(request.getInstructions());
            
            item.setPrice(unitPrice); // ✅ Correct Unit Price (400)
            item.setTotalPrice(unitPrice * request.getQuantity()); // ✅ Correct Total (400 * 1)
            item.setGroup(group);
        }

        itemRepository.save(item);
        recalculateGroupAndOrderTotals(group);

        return item;
    }

    private void recalculateGroupAndOrderTotals(OrderGroup group) {
        double groupTotal = group.getItems().stream()
                .mapToDouble(OrderItem::getTotalPrice).sum();

        group.setGroupTotal(groupTotal);
        groupRepository.save(group);

        Order order = group.getOrder();
        double orderTotal = order.getGroups().stream()
                .mapToDouble(OrderGroup::getGroupTotal).sum();

        order.setTotalAmount(orderTotal);
        orderRepository.save(order);
    }
}
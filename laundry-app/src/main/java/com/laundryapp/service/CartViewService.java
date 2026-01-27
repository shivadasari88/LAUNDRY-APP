package com.laundryapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.dto.CartResponse;
import com.laundryapp.dto.GroupResponse;
import com.laundryapp.dto.ItemResponse;
import com.laundryapp.dto.ShopSummary;
import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderGroup;
import com.laundryapp.entity.OrderItem;
import com.laundryapp.entity.OrderStatus;
import com.laundryapp.entity.Shop;
import com.laundryapp.entity.User;
import com.laundryapp.repository.OrderRepository;
import com.laundryapp.repository.UserRepository;

@Service
public class CartViewService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public CartResponse getCartByUsername(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository
                .findByCustomerIdAndStatus(user.getId(), OrderStatus.DRAFT)
                .orElseThrow(() -> new RuntimeException("No active cart"));

        CartResponse response = new CartResponse();
        response.setOrderId(order.getId());
        response.setOrderStatus(order.getStatus().name());
        response.setTotalAmount(order.getTotalAmount());

        Shop shop = order.getShop();
        ShopSummary shopSummary = new ShopSummary();
        shopSummary.setShopId(shop.getId());
        shopSummary.setShopName(shop.getName());
        shopSummary.setAddress(shop.getAddress());
        response.setShop(shopSummary);

        List<GroupResponse> groupResponses = new ArrayList<>();

        for (OrderGroup group : order.getGroups()) {

            GroupResponse gr = new GroupResponse();
            gr.setGroupId(group.getId());
            gr.setGroupName(group.getGroupName());
            gr.setGroupTotal(group.getGroupTotal());

            List<ItemResponse> items = new ArrayList<>();

            for (OrderItem item : group.getItems()) {
                ItemResponse ir = new ItemResponse();
                ir.setItemId(item.getId());
                ir.setItemName(item.getItemName());
                ir.setServiceType(item.getServiceType());
                ir.setFabricType(item.getFabricType());
                ir.setQuantity(item.getQuantity());
                ir.setUnitPrice(item.getPrice());
                ir.setTotalPrice(item.getTotalPrice());
                ir.setInstructions(item.getInstructions());
                items.add(ir);
            }

            gr.setItems(items);
            groupResponses.add(gr);
        }

        response.setGroups(groupResponses);
        return response;
    }
}

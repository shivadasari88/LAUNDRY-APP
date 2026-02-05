package com.laundryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laundryapp.entity.Order;
import com.laundryapp.entity.OrderHistoryResponse;
import com.laundryapp.repository.OrderRepository;

@Service
public class CustomerOrderHistoryService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderHistoryResponse> getOrderHistory(Long customerId) {

        List<Order> orders = orderRepository.findByCustomerIdOrderByIdDesc(customerId);

        return orders.stream().map(order -> {

            OrderHistoryResponse res = new OrderHistoryResponse();
            res.setOrderId(order.getId());
            res.setStatus(order.getStatus().name());
            res.setTotalAmount(order.getTotalAmount());
            res.setShopName(order.getShop().getName());

            if (order.getGroups() != null) {
                res.setGroups(order.getGroups().stream().map(g -> {
                    com.laundryapp.dto.ProviderOrderGroupSummary gs = new com.laundryapp.dto.ProviderOrderGroupSummary();
                    gs.setGroupId(g.getId());
                    gs.setGroupName(g.getGroupName());
                    // Copy photos
                    if (g.getPhotos() != null) {
                        gs.setPhotos(new java.util.ArrayList<>(g.getPhotos()));
                    }

                    if (g.getItems() != null) {
                        gs.setItems(g.getItems().stream().map(i -> {
                            com.laundryapp.dto.ProviderOrderItemSummary is = new com.laundryapp.dto.ProviderOrderItemSummary();
                            is.setItemId(i.getId());
                            is.setItemName(i.getItemName());
                            is.setServiceType(i.getServiceType());
                            is.setFabricType(i.getFabricType());
                            is.setInstructions(i.getInstructions());
                            is.setQuantity(i.getQuantity());
                            is.setTotalPrice(i.getPrice());
                            return is;
                        }).collect(java.util.stream.Collectors.toList()));
                    }
                    return gs;
                }).collect(java.util.stream.Collectors.toList()));
            }

            return res;
        }).collect(java.util.stream.Collectors.toList());
    }
}

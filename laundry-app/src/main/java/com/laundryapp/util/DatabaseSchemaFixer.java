package com.laundryapp.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSchemaFixer implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("___EXECUTING MANUAL SCHEMA UPDATE___");
        try {
            jdbcTemplate.execute("ALTER TABLE orders MODIFY status VARCHAR(50)");
            System.out.println("___UPDATED orders.status column length___");
        } catch (Exception e) {
            System.out.println("___Failed to update orders table: " + e.getMessage() + "___");
        }

        try {
            jdbcTemplate.execute("ALTER TABLE notifications MODIFY order_status VARCHAR(50)");
            System.out.println("___UPDATED notifications.order_status column length___");
        } catch (Exception e) {
            System.out.println("___Failed to update notifications table: " + e.getMessage() + "___");
        }
    }
}

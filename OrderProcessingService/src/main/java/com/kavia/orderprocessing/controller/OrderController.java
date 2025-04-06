package com.kavia.orderprocessing.controller;

import com.kavia.orderprocessing.model.Order;
import com.kavia.orderprocessing.model.OrderStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Order Management", description = "APIs for managing orders")
public class OrderController {

    @Operation(summary = "Check service status", description = "Returns the status of the Order Processing Service")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Service is running",
                content = @Content(mediaType = "text/plain"))
    })
    @GetMapping("/status")
    public String getStatus() {
        return "Order Processing Service is running!";
    }
    
    @Operation(summary = "Create a new order", description = "Creates a new order in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Order created successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data",
                content = @Content)
    })
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // This is a placeholder implementation
        order.setId(1L);
        order.setStatus(OrderStatus.CREATED);
        return ResponseEntity.status(201).body(order);
    }
    
    @Operation(summary = "Get order by ID", description = "Returns an order by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
        @ApiResponse(responseCode = "404", description = "Order not found",
                content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(
            @Parameter(description = "ID of the order to retrieve") @PathVariable Long id) {
        // This is a placeholder implementation
        Order order = new Order();
        order.setId(id);
        order.setOrderNumber("ORD-" + id);
        order.setStatus(OrderStatus.CREATED);
        return ResponseEntity.ok(order);
    }
    
    @Operation(summary = "Get all orders", description = "Returns a list of all orders")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of orders",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class)))
    })
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        // This is a placeholder implementation
        List<Order> orders = new ArrayList<>();
        Order order1 = new Order();
        order1.setId(1L);
        order1.setOrderNumber("ORD-1");
        order1.setStatus(OrderStatus.CREATED);
        
        Order order2 = new Order();
        order2.setId(2L);
        order2.setOrderNumber("ORD-2");
        order2.setStatus(OrderStatus.PROCESSING);
        
        orders.add(order1);
        orders.add(order2);
        
        return ResponseEntity.ok(orders);
    }
    
    @Operation(summary = "Update order status", description = "Updates the status of an existing order")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order status updated",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
        @ApiResponse(responseCode = "404", description = "Order not found",
                content = @Content)
    })
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @Parameter(description = "ID of the order to update") @PathVariable Long id,
            @Parameter(description = "New status for the order") @RequestParam OrderStatus status) {
        // This is a placeholder implementation
        Order order = new Order();
        order.setId(id);
        order.setOrderNumber("ORD-" + id);
        order.setStatus(status);
        return ResponseEntity.ok(order);
    }
    
    @Operation(summary = "Delete an order", description = "Deletes an order by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Order deleted"),
        @ApiResponse(responseCode = "404", description = "Order not found",
                content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(
            @Parameter(description = "ID of the order to delete") @PathVariable Long id) {
        // This is a placeholder implementation
        return ResponseEntity.noContent().build();
    }
}

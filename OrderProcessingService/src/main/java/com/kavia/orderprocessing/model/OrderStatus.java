package com.kavia.orderprocessing.model;

/**
 * Enum representing the possible states of an order.
 */
public enum OrderStatus {
    CREATED,
    PENDING_PAYMENT,
    PAYMENT_COMPLETED,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED,
    REFUNDED
}

package com.kavia.orderprocessing.model;

/**
 * Enum representing the possible states of a payment.
 */
public enum PaymentStatus {
    PENDING,
    PROCESSING,
    COMPLETED,
    FAILED,
    REFUNDED
}

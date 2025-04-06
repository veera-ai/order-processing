package com.kavia.orderprocessing.controller;

import com.kavia.orderprocessing.model.Payment;
import com.kavia.orderprocessing.model.PaymentMethod;
import com.kavia.orderprocessing.model.PaymentStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Controller for handling payment processing.
 */
@RestController
@RequestMapping("/api/payments")
@Tag(name = "Payment Processing", description = "APIs for processing payments")
public class PaymentController {

    @Operation(summary = "Process payment", description = "Processes a payment for an order")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Payment processed successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Payment.class))),
        @ApiResponse(responseCode = "400", description = "Invalid payment data",
                content = @Content),
        @ApiResponse(responseCode = "404", description = "Order not found",
                content = @Content)
    })
    @PostMapping("/process")
    public ResponseEntity<Payment> processPayment(
            @Parameter(description = "Order ID") @RequestParam Long orderId,
            @Parameter(description = "Payment method") @RequestParam PaymentMethod paymentMethod,
            @Parameter(description = "Payment amount") @RequestParam BigDecimal amount) {
        // This is a placeholder implementation
        Payment payment = new Payment();
        payment.setId(1L);
        payment.setTransactionId("TXN-" + System.currentTimeMillis());
        payment.setPaymentMethod(paymentMethod);
        payment.setAmount(amount);
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setPaymentDate(LocalDateTime.now());
        return ResponseEntity.ok(payment);
    }

    @Operation(summary = "Get payment by ID", description = "Returns a payment by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Payment found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Payment.class))),
        @ApiResponse(responseCode = "404", description = "Payment not found",
                content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(
            @Parameter(description = "ID of the payment to retrieve") @PathVariable Long id) {
        // This is a placeholder implementation
        Payment payment = new Payment();
        payment.setId(id);
        payment.setTransactionId("TXN-" + id);
        payment.setPaymentMethod(PaymentMethod.CREDIT_CARD);
        payment.setAmount(new BigDecimal("100.00"));
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setPaymentDate(LocalDateTime.now());
        return ResponseEntity.ok(payment);
    }

    @Operation(summary = "Get payment by order ID", description = "Returns a payment by its associated order ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Payment found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Payment.class))),
        @ApiResponse(responseCode = "404", description = "Payment not found",
                content = @Content)
    })
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Payment> getPaymentByOrderId(
            @Parameter(description = "ID of the order") @PathVariable Long orderId) {
        // This is a placeholder implementation
        Payment payment = new Payment();
        payment.setId(1L);
        payment.setTransactionId("TXN-" + orderId);
        payment.setPaymentMethod(PaymentMethod.CREDIT_CARD);
        payment.setAmount(new BigDecimal("100.00"));
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setPaymentDate(LocalDateTime.now());
        return ResponseEntity.ok(payment);
    }

    @Operation(summary = "Refund payment", description = "Refunds a payment")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Payment refunded",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Payment.class))),
        @ApiResponse(responseCode = "400", description = "Invalid refund request",
                content = @Content),
        @ApiResponse(responseCode = "404", description = "Payment not found",
                content = @Content)
    })
    @PostMapping("/{id}/refund")
    public ResponseEntity<Payment> refundPayment(
            @Parameter(description = "ID of the payment to refund") @PathVariable Long id,
            @Parameter(description = "Refund amount") @RequestParam(required = false) BigDecimal amount) {
        // This is a placeholder implementation
        Payment payment = new Payment();
        payment.setId(id);
        payment.setTransactionId("TXN-" + id);
        payment.setPaymentMethod(PaymentMethod.CREDIT_CARD);
        payment.setAmount(amount != null ? amount : new BigDecimal("100.00"));
        payment.setStatus(PaymentStatus.REFUNDED);
        payment.setPaymentDate(LocalDateTime.now());
        return ResponseEntity.ok(payment);
    }
}

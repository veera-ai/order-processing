{"is_source_file": true, "format": "Java", "description": "This file defines the Order entity representing an order in the order processing system, including relationships to OrderItem and Payment entities.", "external_files": ["jakarta.persistence"], "external_methods": ["jakarta.persistence.Entity", "jakarta.persistence.Table", "jakarta.persistence.Id", "jakarta.persistence.GeneratedValue", "jakarta.persistence.Column", "jakarta.persistence.OneToMany", "jakarta.persistence.OneToOne", "jakarta.persistence.EnumType"], "published": ["Order", "OrderStatus"], "classes": [{"name": "Order", "description": "Entity representing an order with properties such as id, orderNumber, customerId, orderDate, status, totalAmount, items, and payment."}], "methods": [{"name": "getId", "description": "Returns the ID of the order."}, {"name": "setId", "description": "Sets the ID of the order."}, {"name": "getOrderNumber", "description": "Returns the order number."}, {"name": "setOrderNumber", "description": "Sets the order number."}, {"name": "getCustomerId", "description": "Returns the customer ID associated with the order."}, {"name": "setCustomerId", "description": "Sets the customer ID associated with the order."}, {"name": "getOrderDate", "description": "Returns the order date."}, {"name": "setOrderDate", "description": "Sets the order date."}, {"name": "getStatus", "description": "Returns the current status of the order."}, {"name": "setStatus", "description": "Sets the current status of the order."}, {"name": "getTotalAmount", "description": "Returns the total amount of the order."}, {"name": "setTotalAmount", "description": "Sets the total amount of the order."}, {"name": "getItems", "description": "Returns the list of OrderItems associated with the order."}, {"name": "setItems", "description": "Sets the list of OrderItems associated with the order."}, {"name": "getPayment", "description": "Returns the Payment associated with the order."}, {"name": "setPayment", "description": "Sets the Payment associated with the order."}], "calls": [], "search-terms": ["Order", "OrderProcessingService", "Entity", "Payment", "OrderItem"], "state": 2, "file_id": 14, "knowledge_revision": 52, "git_revision": "", "filename": "/home/kavia/workspace/order-processing/OrderProcessingService/src/main/java/com/kavia/orderprocessing/model/Order.java", "hash": "bad13e161620f7abba0aa96985cb0c25", "format-version": 4, "code-base-name": "default", "revision_history": [{"52": ""}]}
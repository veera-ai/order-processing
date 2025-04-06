{"is_source_file": true, "format": "Java", "description": "Entity representing a payment for an order, with fields for transaction details, including payment method, amount, and status.", "external_files": ["Order.java", "PaymentMethod.java", "PaymentStatus.java"], "external_methods": [], "published": ["Payment"], "classes": [{"name": "Payment", "description": "Represents a payment for an order, encapsulating information such as the transaction ID, associated order, payment method, amount, status, and payment date."}], "methods": [{"name": "getId", "description": "Returns the unique identifier for the payment."}, {"name": "setId", "description": "Sets the unique identifier for the payment."}, {"name": "getOrder", "description": "Returns the associated order for the payment."}, {"name": "setOrder", "description": "Sets the associated order for the payment."}, {"name": "getTransactionId", "description": "Returns the transaction ID for the payment."}, {"name": "setTransactionId", "description": "Sets the transaction ID for the payment."}, {"name": "getPaymentMethod", "description": "Returns the payment method used for the transaction."}, {"name": "setPaymentMethod", "description": "Sets the payment method used for the transaction."}, {"name": "getAmount", "description": "Returns the amount of the payment."}, {"name": "setAmount", "description": "Sets the amount of the payment."}, {"name": "getStatus", "description": "Returns the current status of the payment."}, {"name": "setStatus", "description": "Sets the current status of the payment."}, {"name": "getPaymentDate", "description": "Returns the date when the payment was made."}, {"name": "setPaymentDate", "description": "Sets the date when the payment was made."}], "calls": [], "search-terms": ["order processing payment", "payment transaction details"], "state": 2, "file_id": 25, "knowledge_revision": 59, "git_revision": "", "filename": "/home/kavia/workspace/order-processing/OrderProcessingService/src/main/java/com/kavia/orderprocessing/model/Payment.java", "hash": "365f52c4ef97284b5e88c1a7cc15bad7", "format-version": 4, "code-base-name": "default", "revision_history": [{"59": ""}]}
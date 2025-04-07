{"is_source_file": true, "format": "JavaScript", "description": "Utilities for formatting various types of responses in the Order Processing Mock API.", "external_files": ["./constants"], "external_methods": [], "published": ["formatSuccessResponse", "formatErrorResponse", "formatValidationError", "formatPaginatedResponse", "formatOrderResponse", "formatPaymentResponse"], "classes": [], "methods": [{"name": "formatSuccessResponse", "description": "Formats a success response with status, message, and data."}, {"name": "formatErrorResponse", "description": "Formats an error response with status, error code, message, and optional details."}, {"name": "formatValidationError", "description": "Formats a validation error response by utilizing formatErrorResponse."}, {"name": "formatPaginatedResponse", "description": "Formats a response for paginated data including pagination details."}, {"name": "formatOrderResponse", "description": "Formats order data for the response matching the order structure."}, {"name": "formatPaymentResponse", "description": "Formats payment data for the response."}], "calls": [], "search-terms": ["order formatting", "response utilities", "success response", "error response", "pagination formatting"], "state": 2, "file_id": 55, "knowledge_revision": 125, "git_revision": "", "ctags": [{"_type": "tag", "name": "formatErrorResponse", "path": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "pattern": "/^const formatErrorResponse = (code = ERROR_CODES.INTERNAL_ERROR, message = ERROR_MESSAGES.INTERNA/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "formatOrderResponse", "path": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "pattern": "/^const formatOrderResponse = (order) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "formatPaginatedResponse", "path": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "pattern": "/^const formatPaginatedResponse = (data, page, limit, total) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "formatPaymentResponse", "path": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "pattern": "/^const formatPaymentResponse = (payment) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "formatSuccessResponse", "path": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "pattern": "/^  formatSuccessResponse,$/", "language": "JavaScript", "kind": "field", "scope": "module.exports", "scopeKind": "class"}, {"_type": "tag", "name": "formatSuccessResponse", "path": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "pattern": "/^const formatSuccessResponse = (data, message = 'Success') => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "formatValidationError", "path": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "pattern": "/^const formatValidationError = (errors) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "totalPages", "path": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "pattern": "/^  const totalPages = Math.ceil(total \\/ limit);$/", "language": "JavaScript", "kind": "constant"}], "filename": "/home/kavia/workspace/order-processing/mock-api/utils/formatters.js", "hash": "d8028ffa136f2d877141199e1842922c", "format-version": 4, "code-base-name": "default", "fields": [{"name": "formatSuccessResponse,", "scope": "module.exports", "scopeKind": "class", "description": "unavailable"}], "revision_history": [{"125": ""}]}
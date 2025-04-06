{"is_source_file": true, "format": "JavaScript", "description": "This file serves as the server entry point for an authentication component in a web application. It initializes the application, connects to the database, and listens for incoming requests on a specified port.", "external_files": ["./app.js", "./config/logger.js", "./config/database.js"], "external_methods": ["connectDB"], "published": [], "classes": [], "methods": [{"name": "startServer", "description": "An async function that connects to the database and starts the Express server on the specified port."}], "calls": ["app.listen", "logger.info", "logger.error", "connectDB"], "search-terms": ["server entry point", "database connection", "logging"], "state": 2, "file_id": 26, "knowledge_revision": 256, "git_revision": "fa1482597834a3ece51c8d1edd9e97c0cf6dd915", "revision_history": [{"75": "8296b8630f75858aa9ee4b404a93a5282a92129b"}, {"80": "8296b8630f75858aa9ee4b404a93a5282a92129b"}, {"255": "fa1482597834a3ece51c8d1edd9e97c0cf6dd915"}, {"256": "fa1482597834a3ece51c8d1edd9e97c0cf6dd915"}], "ctags": [{"_type": "tag", "name": "PORT", "path": "/home/kavia/workspace/order-processing/authentication_component/src/server.js", "pattern": "/^const PORT = process.env.PORT || 3000;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "logDir", "path": "/home/kavia/workspace/order-processing/authentication_component/src/server.js", "pattern": "/^const logDir = join(process.cwd(), 'logs');$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "startServer", "path": "/home/kavia/workspace/order-processing/authentication_component/src/server.js", "pattern": "/^const startServer = async () => {$/", "language": "JavaScript", "kind": "constant"}], "filename": "/home/kavia/workspace/order-processing/authentication_component/src/server.js", "hash": "7fa8dca97d47ba970853a64a0c1748a4", "format-version": 4, "code-base-name": "default"}
"use strict";
// Example CustomerService for fetching customers and their onboarding status
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCustomers = getAllCustomers;
const customers = [
    // This should be replaced with DB calls in production
    { id: '1', name: 'Alice', email: 'alice@example.com', status: 'new' },
    { id: '2', name: 'Bob', email: 'bob@example.com', status: 'in_progress' },
    { id: '3', name: 'Carol', email: 'carol@example.com', status: 'completed' },
];
function getAllCustomers() {
    return customers;
}
//# sourceMappingURL=CustomerService.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Dummy data for demonstration
const customers = [
    { id: '1', name: 'Alice', status: 'new' },
    { id: '2', name: 'Bob', status: 'in_progress' },
    { id: '3', name: 'Carol', status: 'completed' },
];
router.get('/', (req, res) => {
    res.json(customers);
});
exports.default = router;
//# sourceMappingURL=customers.js.map
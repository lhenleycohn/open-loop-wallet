"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Ensure this is called at the top of the file
exports.config = {
    port: process.env.PORT || 3000,
    moovBasePath: process.env.MOOV_BASE_PATH || '',
    moovClientId: process.env.MOOV_CLIENT_ID || '',
    moovClientSecret: process.env.MOOV_CLIENT_SECRET || '',
    userId: process.env.USER_ID || '', // Ensure this is correctly loaded
};
if (!exports.config.moovClientSecret) {
    console.error('MOOV_CLIENT_SECRET environment variable is not set.');
    process.exit(1);
}
if (!exports.config.userId) {
    console.error('USER_ID environment variable is not set.');
    process.exit(1);
}
//# sourceMappingURL=config.js.map
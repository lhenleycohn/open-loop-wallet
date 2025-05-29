"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCustomers = getAllCustomers;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl)
    throw new Error('SUPABASE_URL is required.');
if (!supabaseServiceKey)
    throw new Error('SUPABASE_SERVICE_KEY is required.');
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey);
function getAllCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        // Use left join and select wallets.id as walletId directly
        const { data, error } = yield supabase
            .from('customers')
            .select('id, name, email, status, created_at, wallets(id)')
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        // Map walletId to top-level property for each customer
        return data.map((customer) => {
            const walletId = Array.isArray(customer.wallets) && customer.wallets.length > 0
                ? customer.wallets[0].id
                : null;
            return {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                status: customer.status,
                walletId,
                // ...other fields if needed...
            };
        });
    });
}
//# sourceMappingURL=CustomerService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const balanceController_1 = __importDefault(require("./../controllers/balanceController"));
class BalanceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', balanceController_1.default.list)
            .get('/:id', balanceController_1.default.getonebalance)
            .post('/', balanceController_1.default.addbalance)
            .delete('/:id', balanceController_1.default.delbalance)
            .put('/:id', balanceController_1.default.uptdbalance);
    }
}
const balanceRoutes = new BalanceRoutes();
exports.default = balanceRoutes.router;

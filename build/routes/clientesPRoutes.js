"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesPController_1 = __importDefault(require("./../controllers/clientesPController"));
class ClientesPRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clientesPController_1.default.list)
            .get('/:id', clientesPController_1.default.getoneclienteP)
            .post('/', clientesPController_1.default.addclienteP)
            .delete('/:id', clientesPController_1.default.delclienteP)
            .put('/:id', clientesPController_1.default.uptdclienteP);
    }
}
const clientespRoutes = new ClientesPRoutes();
exports.default = clientespRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expedienteMedicoController_1 = __importDefault(require("./../controllers/expedienteMedicoController"));
class Expediente_medicoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', expedienteMedicoController_1.default.list)
            .get('/:id', expedienteMedicoController_1.default.getoneexpediente_medico)
            .post('/', expedienteMedicoController_1.default.addexpediente_medico)
            .delete('/:id', expedienteMedicoController_1.default.delexpediente_medico)
            .put('/:id', expedienteMedicoController_1.default.uptdexpediente_medico);
    }
}
const expediente_medicoRoutes = new Expediente_medicoRoutes();
exports.default = expediente_medicoRoutes.router;

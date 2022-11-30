"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citaController_1 = __importDefault(require("./../controllers/citaController"));
class CitaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', citaController_1.default.list)
            .get('/:id', citaController_1.default.getonecita)
            .get('/listCitaFisio/:id', citaController_1.default.getCitasFisios)
            .get('/countCitas/:id', citaController_1.default.getCitasCount)
            .get('/listCitaClient/:id', citaController_1.default.getCitasClients)
            .get('/listCitaFisioH/:id', citaController_1.default.getCitasFisiosH)
            .get('/listCitaClientH/:id', citaController_1.default.getCitasClientsH)
            .post('/', citaController_1.default.addcita)
            .delete('/:id', citaController_1.default.delcita)
            .put('/:id', citaController_1.default.uptdcita);
    }
}
const citaRoutes = new CitaRoutes();
exports.default = citaRoutes.router;

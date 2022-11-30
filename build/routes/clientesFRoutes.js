"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesFController_1 = __importDefault(require("./../controllers/clientesFController"));
class ClientesFRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clientesFController_1.default.list)
            .get('/:id', clientesFController_1.default.getoneClienteF)
            .get('/puntuacion/:id', clientesFController_1.default.getonePuntuacion)
            .post('/', clientesFController_1.default.addClienteF)
            .post('/noFavoritos', clientesFController_1.default.fisiosnotFavs)
            .post('/Favoritos', clientesFController_1.default.fisiosFavs)
            .delete('/:id', clientesFController_1.default.delClienteF)
            .put('/:id', clientesFController_1.default.uptdClienteF);
    }
}
const clientesfRoutes = new ClientesFRoutes();
exports.default = clientesfRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generalController_1 = __importDefault(require("./../controllers/generalController"));
class GeneralRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/LogIn', generalController_1.default.inicioSesion)
            .get('/forgotPassword/:correo', generalController_1.default.forgotPassword)
            .get('/DataSendMessage/:usuario', generalController_1.default.dataGetUser);
    }
}
const generalRoutes = new GeneralRoutes();
exports.default = generalRoutes.router;

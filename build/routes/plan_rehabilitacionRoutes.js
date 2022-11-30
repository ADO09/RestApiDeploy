"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plan_rehabilitacionController_1 = __importDefault(require("./../controllers/plan_rehabilitacionController"));
class Plan_rehabilitacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', plan_rehabilitacionController_1.default.list)
            .get('/:id', plan_rehabilitacionController_1.default.getoneplan_rehabilitacion)
            .get('/planFisio/:id', plan_rehabilitacionController_1.default.getPlanOneFisio)
            .post('/', plan_rehabilitacionController_1.default.addplan_rehabilitacion)
            .delete('/:id', plan_rehabilitacionController_1.default.delplan_rehabilitacion)
            .put('/:id', plan_rehabilitacionController_1.default.uptdplan_rehabilitacion);
    }
}
const plan_rehabilitacionRoutes = new Plan_rehabilitacionRoutes();
exports.default = plan_rehabilitacionRoutes.router;

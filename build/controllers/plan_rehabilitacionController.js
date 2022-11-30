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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class Plan_rehabilitacionController {
    //plan_rehabilitacion 
    //SELECT
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            try {
                const plan_rehabilitacion = yield conn.query("SELECT * FROM plan_rehabilitacion");
                const response = { error: false, msg: "PLANES COMPLETOS", data: plan_rehabilitacion[0] };
                return res.json(response);
            }
            catch (error) {
                const response = { error: true, msg: "ERROR", data: null };
                console.log(error);
                return res.status(500).json(response);
            }
        });
    }
    //SELECT WHERE ID =
    getoneplan_rehabilitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const plan_rehabilitacion = yield conn.query("SELECT * FROM plan_rehabilitacion WHERE id_plan = ?", [id]);
                const response = { error: false, msg: "PLAN", data: plan_rehabilitacion[0][0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    //INSERT INTO
    addplan_rehabilitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            try {
                const conn = yield (0, database_1.connect)();
                const plan_rehabilitacioninf = req.body;
                console.log(plan_rehabilitacioninf);
                const plan_rehabilitacion = yield conn.query("INSERT INTO plan_rehabilitacion SET ?", [
                    plan_rehabilitacioninf,
                ]);
                const response = { error: false, msg: "PLAN AÑADIDO", data: plan_rehabilitacion[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                const response = { error: true, msg: "ERROR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    //DELETE
    delplan_rehabilitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const plan_rehabilitacion = yield conn.query("DELETE FROM plan_rehabilitacion WHERE id_plan = ?", [id]);
                const response = { error: false, msg: "ELIMINADO", data: plan_rehabilitacion[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    //UPDATE
    uptdplan_rehabilitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //     try {
            //      await pool.execute("UPDATE plan_rehabilitacion set ? WHERE id_plan = ?",[req.body,id]);
            try {
                const id = req.params.id;
                const plan_rehabilitacioninf = req.body;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const plan_rehabilitacion = yield conn.query("UPDATE plan_rehabilitacion set ? WHERE id_plan = ?", [plan_rehabilitacioninf, id]);
                const response = { error: false, msg: "PLAN ACTUALIZADO", data: plan_rehabilitacion[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                const response = { error: true, msg: "ERROR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    getPlanOneFisio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const plan_rehabilitacion = yield conn.query("SELECT * FROM plan_rehabilitacion WHERE id_fisio = ? and estatus = '1'", [id]);
                const response = { error: false, msg: "PLAN", data: plan_rehabilitacion[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR", data: null };
                return res.status(500).json(response);
            }
        });
    }
}
const plan_rehabilitacionController = new Plan_rehabilitacionController();
exports.default = plan_rehabilitacionController;

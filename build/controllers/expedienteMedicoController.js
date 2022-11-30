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
class Expediente_medicoController {
    //expediente_medico 
    //SELECT
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            try {
                const expediente_medico = yield conn.query("SELECT * FROM expediente_medico");
                return res.json(expediente_medico[0]);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //SELECT WHERE ID =
    getoneexpediente_medico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const expediente_medico = yield conn.query("select c.*,p.*, f.nombre,f.apellido1,f.correo,f.telefono,f.id_fisio from fisiolines.cita c join fisiolines.plan_rehabilitacion p on c.id_plan = p.id_plan join fisioterapeuta f on f.id_fisio = c.id_fisio where c.id_cliente = ?;", [id]);
                const response = { error: false, msg: "Cuenta actualizado", data: expediente_medico[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                const response = { error: true, msg: "Cuenta actualizado", data: null };
                return res.status(500).json(response);
            }
        });
    }
    //INSERT INTO
    addexpediente_medico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            try {
                const conn = yield (0, database_1.connect)();
                const expediente_medicoinf = req.body;
                console.log(expediente_medicoinf);
                const expediente_medico = yield conn.query("INSERT INTO expediente_medico SET ?", [
                    expediente_medicoinf,
                ]);
                return res.json({
                    message: "expediente_medico Fisio Registrado",
                    //expediente_medico
                });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    //DELETE
    delexpediente_medico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const expediente_medico = yield conn.query("DELETE FROM expediente_medico WHERE id_expediente = ?", [id]);
                return res.json(expediente_medico[0]);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                return null;
            }
        });
    }
    //UPDATE
    uptdexpediente_medico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //     try {
            //      await pool.execute("UPDATE expediente_medico set ? WHERE id_expediente = ?",[req.body,id]);
            try {
                const id = req.params.id;
                const expediente_medicoinf = req.body;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const expediente_medico = yield conn.query("UPDATE expediente_medico set ? WHERE id_expediente = ?", [expediente_medicoinf, id]);
                return res.json(expediente_medico[0]);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                return null;
            }
        });
    }
}
const expediente_medicoController = new Expediente_medicoController();
exports.default = expediente_medicoController;

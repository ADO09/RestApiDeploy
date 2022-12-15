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
class CitaController {
    //CITA 
    //SELECT
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            try {
                const cita = yield conn.query("SELECT * FROM cita");
                return res.json(cita[0]);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getCitasFisios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("select c.*, p.nombre, p.apellido1, p.apellido2, p.curp,p.correo, p.estatusCuenta,p.usuario,p.id_cliente from cita c join  cliente p on c.id_cliente = p.id_cliente  where id_fisio = ? and estatus = '1' and p.estatusCuenta= '1'", [id]);
                const response = { error: false, msg: "CITAS DEL FISIO", data: cita[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR SERVIDOR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    getCitasFisiosHBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("select c.*, p.nombre, p.apellido1, p.apellido2, p.curp, p.correo, p.estatusCuenta,p.usuario,p.id_cliente from cita c join  cliente p on c.id_cliente = p.id_cliente  where id_fisio = ? and estatus in ('1','2','5')  and p.estatusCuenta= '1'  ", [id]);
                const response = { error: false, msg: "CITAS DEL FISIO", data: cita[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR SERVIDOR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    getCitasFisiosH(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("select c.*, p.nombre, p.apellido1, p.apellido2, p.curp, p.correo, p.estatusCuenta,p.usuario,p.id_cliente from cita c join  cliente p on c.id_cliente = p.id_cliente  where id_fisio = ? and estatus in ('1','2','3')  and p.estatusCuenta= '1'  ", [id]);
                const response = { error: false, msg: "CITAS DEL FISIO", data: cita[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR SERVIDOR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    getCitasClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("select c.*, f.nombre, f.apellido1, f.apellido2, f.RFC, f.correo,f.estatusCuenta,f.usuario,f.id_fisio from cita c join  fisioterapeuta f on c.id_fisio = f.id_fisio  where id_cliente = ? and estatus = '1' and f.estatusCuenta = '1'", [id]);
                const response = { error: false, msg: "CITAS DEL FISIO", data: cita[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR SERVIDOR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    getCitasClientsH(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("select c.*, f.nombre, f.apellido1, f.apellido2, f.RFC, f.correo,f.estatusCuenta,f.usuario,f.id_fisio from cita c join  fisioterapeuta f on c.id_fisio = f.id_fisio  where id_cliente = ? and estatus in ('1','2','3','4')  and f.estatusCuenta = '1' ", [id]);
                const response = { error: false, msg: "CITAS DEL FISIO", data: cita[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR SERVIDOR", data: null };
                return res.status(500).json(response);
            }
        });
    }
    //SELECT WHERE ID =
    getonecita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("SELECT * FROM cita WHERE id_cita = ?", [id]);
                return res.json(cita[0]);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                return null;
            }
        });
    }
    //INSERT INTO
    addcita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            try {
                const conn = yield (0, database_1.connect)();
                const citainf = req.body;
                console.log(citainf);
                const cita = yield conn.query("INSERT INTO cita SET ?", [
                    citainf,
                ]);
                const response = { error: false, msg: "Cita registrada", data: cita[0] };
                return res.json(response);
            }
            catch (error) {
                const response = { error: true, msg: "ERROR" + error, data: null };
                console.log(error);
                return res.status(500).json(response);
            }
        });
    }
    //DELETE
    delcita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("DELETE FROM cita WHERE id_cita = ?", [id]);
                const response = { error: false, msg: "CITA ELIMINADA", data: cita[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: false, msg: "CITA ELIMINADA", data: null };
                return res.status(500).json(response);
            }
        });
    }
    //UPDATE
    uptdcita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //     try {
            //      await pool.execute("UPDATE cita set ? WHERE id_cita = ?",[req.body,id]);
            try {
                const id = req.params.id;
                const citainf = req.body;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("UPDATE cita set ? WHERE id_cita = ?", [citainf, id]);
                const response = { error: false, msg: "CITA ACTUALIZADA", data: cita[0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: error, data: null };
                return response;
            }
        });
    }
    getCitasCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const cita = yield conn.query("select COUNT(id_cita) from cita where id_fisio = ? and estatus in (3)", [id]);
                const response = { error: false, msg: "CITAS DEL FISIO", data: cita[0][0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR SERVIDOR", data: null };
                return res.status(500).json(response);
            }
        });
    }
}
const citaController = new CitaController();
exports.default = citaController;

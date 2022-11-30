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
class ClientesPController {
    //CLIENTES FISIOTERAPEUTAS
    // const response = {error:false,msg:"AQUI ESTA EL DATO",data:general[0][0]};
    //SELECT
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            try {
                const clienteP = yield conn.query("SELECT * FROM cliente");
                const response = { error: false, msg: "CLIENTES", data: clienteP[0] };
                return res.json(response);
            }
            catch (error) {
                const response = { error: true, msg: "ERROR" + error, data: null };
                console.log(response);
            }
        });
    }
    //SELECT WHERE ID =
    getoneclienteP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const clienteP = yield conn.query("SELECT * FROM cliente WHERE id_Cliente = ?", [id]);
                return res.json(clienteP[0][0]);
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
    addclienteP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            const path = require("path");
            console.log(req.body);
            try {
                const conn = yield (0, database_1.connect)();
                const clienteinF = req.body;
                const clienteFU = yield conn.query("SELECT usuario FROM fisioterapeuta");
                for (let index = 0; index < clienteFU[0].length; index++) {
                    if (clienteFU[0][index].usuario == clienteinF.usuario) {
                        const response = { error: true, msg: "ESTE USUARIO YA ESTA LIGADO A UNA CUENTA" };
                        return res.status(410).json(response);
                    }
                }
                const clientePUC = yield conn.query("SELECT curp FROM cliente");
                for (let index = 0; index < clientePUC[0].length; index++) {
                    if (clientePUC[0][index].curp == clienteinF.curp) {
                        const response = { error: true, msg: "ESTE CURP YA ESTA LIGADO A UNA CUENTA" };
                        return res.json(response);
                    }
                }
                const clientePU = yield conn.query("SELECT usuario FROM cliente");
                for (let index = 0; index < clientePU[0].length; index++) {
                    if (clientePU[0][index].usuario == clienteinF.usuario) {
                        const response = { error: true, msg: "ESTE USUARIO YA ESTA LIGADO A UNA CUENTA" };
                        return res.status(410).json(response);
                    }
                }
                if (req.files) {
                    //console.log(req.files);
                    // console.log("Si LLEGOSOIDHDAISD");
                    var fs = require('fs');
                    var dir = './archivos/ClientesPacientesArchivos/' + clienteinF.curp;
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    const img = req.files.fotografia;
                    const extfileImg = path.extname(img.name);
                    yield img.mv("./archivos/ClientesPacientesArchivos/" + clienteinF.curp + "/" + "Imagen" + extfileImg);
                    clienteinF.fotografia = "/ClientesPacientesArchivos/" + clienteinF.curp + "/" + "Imagen" + extfileImg;
                }
                console.log(clienteinF);
                const clienteP = yield conn.query("INSERT INTO cliente SET ?", [
                    clienteinF,
                ]);
                const response = { error: false, msg: "SE AGREGO EL CLIENTE" };
                return res.json(response);
            }
            catch (error) {
                const response = { error: true, msg: "ERROR" };
                console.log(error);
                return res.status(500).json(response);
            }
        });
    }
    //DELETE
    delclienteP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const clienteP = yield conn.query("DELETE FROM cliente WHERE idCliente = ?", [id]);
                return res.json(clienteP[0]);
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
    uptdclienteP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //     try {
            //      await pool.execute("UPDATE clientes set ? WHERE idCliente = ?",[req.body,id]);
            try {
                const id = req.params.id;
                const clienteinF = req.body;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const clienteFU = yield conn.query("SELECT usuario FROM fisioterapeuta");
                for (let index = 0; index < clienteFU[0].length; index++) {
                    if (clienteFU[0][index].usuario == clienteinF.usuario) {
                        const response = { error: true, msg: "ESTE USUARIO YA ESTA LIGADO A UNA CUENTA" };
                        return res.json(response);
                    }
                }
                const clientePUC = yield conn.query("SELECT curp FROM cliente  where id_cliente not in (" + id + ")");
                for (let index = 0; index < clientePUC[0].length; index++) {
                    if (clientePUC[0][index].curp == clienteinF.curp) {
                        const response = { error: true, msg: "ESTE CURP YA ESTA LIGADO A UNA CUENTA" };
                        return res.json(response);
                    }
                }
                const clientePU = yield conn.query("SELECT usuario FROM cliente  where id_cliente not in (" + id + ")");
                for (let index = 0; index < clientePU[0].length; index++) {
                    if (clientePU[0][index].usuario == clienteinF.usuario) {
                        const response = { error: true, msg: "ESTE USUARIO YA ESTA LIGADO A UNA CUENTA" };
                        return res.json(response);
                    }
                }
                const http = require("http");
                const path = require("path");
                const clientePC = yield conn.query("SELECT * FROM fisioterapeuta WHERE id_fisio = ?", [id]);
                if (req.files) {
                    if (req.files.fotografia) {
                        var fs = require('fs');
                        var dir = './archivos/ClientesPacientesArchivos/' + clienteinF.curp;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        console.log('aoisjoaisjd');
                        const img = req.files.fotografia;
                        const extfileImg = path.extname(img.name);
                        yield img.mv("archivos/ClientesPacientesArchivos/" + clienteinF.curp + "/" + "Imagen" + extfileImg);
                        clienteinF.fotografia = "/ClientesPacientesArchivos/" + clienteinF.curp + "/" + "Imagen" + extfileImg;
                    }
                    else {
                        clienteinF.fotografia = clientePC[0][0].fotografia;
                    }
                }
                console.log(clienteinF.fotografia);
                const clienteP = yield conn.query("UPDATE cliente set ? WHERE id_Cliente = ?", [clienteinF, id]);
                console.log(clienteP);
                console.log('ajshdihadlkasjdkl');
                const clienteCRESP = yield conn.query("SELECT id_cliente,usuario,contrasena,TipoUsuario,correo,nombre,fotografia,TemaPagina,favoritos FROM cliente WHERE id_cliente = ?", [id]);
                //console.log(clienteCRESP[0][0])
                const response = { error: false, msg: "Se actualizo bueno", data: clienteCRESP[0][0] };
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500);
                res.send(error);
                const response = { error: true, msg: "ERROR: " + error, data: null };
                return res.status(500).json(response);
            }
        });
    }
}
const clientepController = new ClientesPController();
exports.default = clientepController;

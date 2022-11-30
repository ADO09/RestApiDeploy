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
class BalanceController {
    //balance 
    //SELECT
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, database_1.connect)();
            try {
                const balance = yield conn.query("SELECT * FROM balance");
                return res.json(balance[0]);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //SELECT WHERE ID =
    getonebalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const balance = yield conn.query("SELECT * FROM balance WHERE id_balance = ?", [id]);
                return res.json(balance[0]);
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
    addbalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            try {
                const conn = yield (0, database_1.connect)();
                const balanceinf = req.body;
                console.log(balanceinf);
                const balance = yield conn.query("INSERT INTO balance SET ?", [
                    balanceinf,
                ]);
                return res.json({
                    message: "balance Fisio Registrado",
                    //balance
                });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    //DELETE
    delbalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const balance = yield conn.query("DELETE FROM balance WHERE id_balance = ?", [id]);
                return res.json(balance[0]);
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
    uptdbalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //     try {
            //      await pool.execute("UPDATE balance set ? WHERE id_balance = ?",[req.body,id]);
            try {
                const id = req.params.id;
                const balanceinf = req.body;
                console.log(id);
                const conn = yield (0, database_1.connect)();
                const balance = yield conn.query("UPDATE balance set ? WHERE id_balance = ?", [balanceinf, id]);
                return res.json(balance[0]);
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
const balanceController = new BalanceController();
exports.default = balanceController;

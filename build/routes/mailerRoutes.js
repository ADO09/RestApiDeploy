"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailerControllers_1 = require("../controllers/mailerControllers");
class MailerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', mailerControllers_1.mailerController.MAIL1)
            .post('/mssge', mailerControllers_1.mailerController.mssgFisioCliente)
            .post('/citAcptFis', mailerControllers_1.mailerController.mssgcitAcptFis)
            .post('/citAcptClit', mailerControllers_1.mailerController.mssgcitAcptClit)
            .post('/baneoCuenta', mailerControllers_1.mailerController.mssBaneoCuenta);
    }
}
const mailerRoutes = new MailerRoutes();
exports.default = mailerRoutes.router;

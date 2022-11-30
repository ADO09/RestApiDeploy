"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const indexroutes_1 = __importDefault(require("./routes/indexroutes"));
const clientesFRoutes_1 = __importDefault(require("./routes/clientesFRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const clientesPRoutes_1 = __importDefault(require("./routes/clientesPRoutes"));
const generalRoutes_1 = __importDefault(require("./routes/generalRoutes"));
const citaRoutes_1 = __importDefault(require("./routes/citaRoutes"));
const expedienteMedicoRoutes_1 = __importDefault(require("./routes/expedienteMedicoRoutes"));
const plan_rehabilitacionRoutes_1 = __importDefault(require("./routes/plan_rehabilitacionRoutes"));
const balanceRoutes_1 = __importDefault(require("./routes/balanceRoutes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mailerRoutes_1 = __importDefault(require("./routes/mailerRoutes"));
class App {
    constructor() {
        this.path = require('path');
        //const fileUpload = require ("express-fileupload");
        this.app = (0, express_1.default)();
        this.config();
        this.middleware();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORTSERV || 3000);
        this.app.use((0, cors_1.default)());
    }
    middleware() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, express_fileupload_1.default)());
        this.app.use(express_1.default.static(this.path.resolve(__dirname, '../archivos')));
    }
    routes() {
        this.app.use('/', indexroutes_1.default);
        this.app.use('/api/clientesF', clientesFRoutes_1.default);
        this.app.use('/api/clientesP', clientesPRoutes_1.default);
        this.app.use('/api/inisesion', generalRoutes_1.default);
        this.app.use('/api/cita', citaRoutes_1.default);
        this.app.use('/api/balance', balanceRoutes_1.default);
        this.app.use('/api/expedienteMedico', expedienteMedicoRoutes_1.default);
        this.app.use('/api/planRehabilitacion', plan_rehabilitacionRoutes_1.default);
        this.app.use('/api/generalRoutes', generalRoutes_1.default);
        this.app.use('/api/mailer', mailerRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get('port'));
        });
    }
}
exports.App = App;

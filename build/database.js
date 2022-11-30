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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const dotenv = require('dotenv').config();
const { createPool } = require('mysql2/promise');
//console.log(process.env.PORT);
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield createPool({
            port: process.env.PORT || "",
            host: process.env.HOST || "",
            database: process.env.DATABASE || "",
            user: process.env.USER || "",
            password: process.env.PASSWORD || ""
        });
        return connection;
    });
}
exports.connect = connect;
try {
    connect();
    console.log("CONNECTED TO DB");
}
catch (error) {
    console.log(error);
}

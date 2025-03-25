"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { Request, Response } from 'express';
const diaries_1 = __importDefault(require("./routes/diaries"));
const cors_1 = __importDefault(require("cors"));
//import jsonServer from 'json-server'
const app = (0, express_1.default)();
//////////////////////JSON-SERVER EXPERIMENT//////////////////////////////////
/*const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()*/
//////////////////////JSON-SERVER EXPERIMENT//////////////////////////////////
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//////////////////////JSON-SERVER EXPERIMENT//////////////////////////////////
/*app.use(middlewares)
app.use(jsonServer.bodyParser)
app.use(router)*/
//////////////////////JSON-SERVER EXPERIMENT//////////////////////////////////
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diaries', diaries_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

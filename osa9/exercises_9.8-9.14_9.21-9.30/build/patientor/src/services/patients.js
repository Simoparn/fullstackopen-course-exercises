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
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${constants_1.apiBaseUrl}/patients`);
    return data;
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`axios, requested patients id: ${apiBaseUrl}/patients/${id}`)
    try {
        const { data } = yield axios_1.default.get(`${constants_1.apiBaseUrl}/patients/${id}`);
        console.log('axios, retrieved patient:', data);
        return data;
    }
    catch (error) {
        console.log('error in axios:', error);
    }
});
const createPatient = (object) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post(`${constants_1.apiBaseUrl}/patients`, object);
    return data;
});
const createEntry = (id, object) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post(`${constants_1.apiBaseUrl}/patients/${id}/entries`, object);
    return data;
});
exports.default = {
    getAll, findById, createPatient, createEntry
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiary = exports.getAllDiaries = void 0;
const axios_1 = __importDefault(require("axios"));
const baseUrl = 'http://localhost:3000/api/diaries';
const getAllDiaries = () => {
    return axios_1.default
        .get(baseUrl)
        .then(response => response.data);
};
exports.getAllDiaries = getAllDiaries;
const createDiary = (object) => {
    console.log('Axios, createDiary, adding the following diary:', object);
    return axios_1.default
        .post(baseUrl, object)
        .then(response => response.data);
};
exports.createDiary = createDiary;

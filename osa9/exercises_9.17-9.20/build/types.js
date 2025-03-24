"use strict";
//import { z } from 'zod'
//import { newEntrySchema } from './utils';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visibility = exports.Weather = void 0;
/*export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';*/
var Weather;
(function (Weather) {
    Weather["Sunny"] = "sunny";
    Weather["Rainy"] = "rainy";
    Weather["Cloudy"] = "cloudy";
    Weather["Stormy"] = "stormy";
    Weather["Windy"] = "windy";
})(Weather || (exports.Weather = Weather = {}));
/*export type Visibility = 'great' | 'good' | 'ok' | 'poor';*/
var Visibility;
(function (Visibility) {
    Visibility["Great"] = "great";
    Visibility["Good"] = "good";
    Visibility["Ok"] = "ok";
    Visibility["Poor"] = "poor";
})(Visibility || (exports.Visibility = Visibility = {}));
// infer the type from schema
//export type NewDiaryEntry = z.infer<typeof newEntrySchema>; 

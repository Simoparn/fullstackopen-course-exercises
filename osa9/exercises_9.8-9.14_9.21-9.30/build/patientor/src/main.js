"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("react-dom/client"));
const react_router_dom_1 = require("react-router-dom");
const App_js_1 = __importDefault(require("./App.js"));
client_1.default.createRoot(document.getElementById('root')).render(<react_router_dom_1.BrowserRouter>
  <App_js_1.default />
  </react_router_dom_1.BrowserRouter>);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configuration for .env file
dotenv_1.default.config();
// Create Express APP
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Routes
app.get('/', (req, res) => {
    res.send('TEST APP EXPRESS + TS + NODEMON + CONCURRENTLY + JEST + SWAGGER + MONGOOSE');
});
app.get('/hello', (req, res) => {
    res.send('Hello');
});
// Execute Server and Listen to PORT
app.listen(port, () => console.log(`>>> Express server running in http://localhost:${port}`));
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const app = (0, express_1.default)();
// binding middleware
app.use('/v1', dataRoutes_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map
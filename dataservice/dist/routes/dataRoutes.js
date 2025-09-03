"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataController_1 = __importDefault(require("../api/controller/dataController"));
const router = express_1.default.Router();
router.use('/api/service', dataController_1.default);
exports.default = router;
//# sourceMappingURL=dataRoutes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
async function fetchData(bearerToken) {
    try {
        const response = await axios_1.default.get(`${'BASEURL'}/v1/metadata`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from metadata source. Status code: ${response.status}`);
        }
        return response.data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
exports.fetchData = fetchData;
exports.default = fetchData;
//# sourceMappingURL=api.js.map
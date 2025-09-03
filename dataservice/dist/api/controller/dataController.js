"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mockData_1 = require("../../data/mockData");
// Authentication and Authorization layers to be considered
// Routes requests related to data to the dataController
const dataRouter = express_1.default.Router();
dataRouter.get('', async (req, res) => {
    try {
        // fetching user from database
        // Axios/HTTP requests to get data from external sources
        // const data = await fetchData(req.bearerToken)
        // map data to data model
        await res.json('Accessing data service');
    }
    catch (err) {
        console.error(`Error occurred: ${err.message}`);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});
dataRouter.get('/users', async (req, res) => {
    try {
        // fetching user from database
        // Axios/HTTP requests to get data from external sources
        // const data = await fetchData(req.bearerToken)
        // map data to data model
        await res.json(mockData_1.mockUser);
        console.log(`Successfully fetched ${mockData_1.mockUser.length} user`);
    }
    catch (err) {
        console.error(`Error occurred: ${err.message}`);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});
dataRouter.get('/org', async (req, res) => {
    try {
        // fetching organization from database
        // make Axios/HTTP requests to get data from external sources
        await res.json(mockData_1.mockOrg);
        console.log(`Successfully fetched ${mockData_1.mockOrg.length} organizations`);
    }
    catch (err) {
        console.error(`Error occurred: ${err.message}`);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});
dataRouter.get('/deposit', async (req, res) => {
    try {
        // fetching deposits from database
        // need to make Axios/HTTP requests to get data from external sources
        await res.json(mockData_1.mockDeposit);
        console.log(`Successfully fetched ${mockData_1.mockDeposit.length} deposits`);
    }
    catch (err) {
        console.error(`Error occurred: ${err.message}`);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});
dataRouter.get('/coordinates', async (req, res) => {
    try {
        // fetching coordinates from database
        // Axios/HTTP requests to get data from external sources
        // const data = await fetchData(req.bearerToken)
        // map data to data model
        res.json(mockData_1.mockCoordinates);
        console.log(`Successfully fetched ${mockData_1.mockCoordinates.length} coordinates`);
    }
    catch (err) {
        console.error(`Error occurred: ${err.message}`);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});
exports.default = dataRouter;
//# sourceMappingURL=dataController.js.map
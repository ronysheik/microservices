import express from "express";
import dataRouter from "../api/controller/dataController";

const router = express.Router();

router.use('/api/service',dataRouter);

export default router;
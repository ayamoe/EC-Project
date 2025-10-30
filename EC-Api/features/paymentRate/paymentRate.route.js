import { setController,getController } from "./paymentRate.controller.js";

import express from "express";

const paymentrateRouter = express.Router();

paymentrateRouter.post('/set',setController);
paymentrateRouter.get('/get',getController);

export default paymentrateRouter;
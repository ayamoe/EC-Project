import { setController,getController } from "./payment.controller.js";

import express from "express";

const paymentRouter = express.Router();

paymentRouter.post('/set',setController);
paymentRouter.get('/get',getController);

export default paymentRouter;
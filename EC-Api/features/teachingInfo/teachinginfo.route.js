import express from "express";
import { setController,getController,deleteController } from "./teachingInfo.controller.js";

const teachinginfoRouter = express.Router();

teachinginfoRouter.post('/set',setController)
teachinginfoRouter.get('/get',getController);
teachinginfoRouter.delete('/delete/:id',deleteController)

export default teachinginfoRouter;
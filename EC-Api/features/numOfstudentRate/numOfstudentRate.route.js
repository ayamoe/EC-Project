import express from "express";
import { getController,setController } from "./numOfstudentRate.controller.js";


const numofstudentrateRouter = express.Router();


numofstudentrateRouter.get('/get',getController);
numofstudentrateRouter.post('/set',setController)

export default numofstudentrateRouter;
import express from "express"
import { setController,getController } from "./teacher.controller.js";

const teacherRouter = express.Router();

teacherRouter.post('/set',setController);
teacherRouter.get('/get',getController);

export default teacherRouter;
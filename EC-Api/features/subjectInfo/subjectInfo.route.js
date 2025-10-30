import express from "express";

import { setController,getController } from "./subjectInfo.controller.js";

const subjectinforouter = express.Router();


subjectinforouter.get('/get',getController);
subjectinforouter.post('/set',setController)

export default subjectinforouter;
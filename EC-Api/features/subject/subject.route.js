import express from "express";

import {setController,getController} from "./subject.controller.js"

const subjectrouter = express.Router();


subjectrouter.get('/get',getController);
subjectrouter.post('/set',setController)

export default subjectrouter;
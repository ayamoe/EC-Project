import express from "express";
import { getserieController,setserieController } from "./serie.controller.js";


const serierouter = express.Router();


serierouter.get('/get',getserieController);
serierouter.post('/set',setserieController)

export default serierouter;
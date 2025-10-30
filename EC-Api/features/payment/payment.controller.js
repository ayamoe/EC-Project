import { setPayment,getPayment } from "./payment.service.js";

export const setController = async(req,res) =>{
    const {sub,serie,numofstudent,rate}= req.body;
    const result = await setPayment(sub,serie,numofstudent,rate);

    return res.json({result});
}
export const getController = async(req,res)=>{
    const {name,year,month} = req.query;
    
    const result = await getPayment(name,year,month);
    
    return res.json(result);  
}
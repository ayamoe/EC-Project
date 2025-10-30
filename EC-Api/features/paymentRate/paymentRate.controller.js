import { setPaymentRate,getPaymentRate } from "./paymentRate.service.js";

export const setController = async(req,res) =>{
    const {sub,serie,numofstudent,rate}= req.body;
    const result = await setPaymentRate(sub,serie,numofstudent,rate);

    return res.json({result});
}
export const getController = async(req,res)=>{

    const result = await getPaymentRate();

    return res.json(result);  
}
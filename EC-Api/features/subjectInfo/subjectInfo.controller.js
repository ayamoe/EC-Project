import { getSubjectInfo,setSubjectInfo } from "./subjectInfo.service.js";

export const setController =async  (req,res)=>{
    const  {rid,sid,subId,num}= req.body;
   
     const result = await setSubjectInfo(rid,sid,subId,num);
    
    return res.json(result);
    
}

export const getController = async (req,res)=>{
    

    const data = await getSubjectInfo();

    return res.json(data);
}
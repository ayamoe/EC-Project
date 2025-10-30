import {setSubject,getSubject}  from "./subject.service.js";


export const setController =async  (req,res)=>{
    const  {name,rid}= req.body;
    
       const data= await setSubject(name,rid)
       return res.json(data);
    
    
}

export const getController = async (req,res)=>{
    

    const data = await getSubject();

    return res.json(data);
}
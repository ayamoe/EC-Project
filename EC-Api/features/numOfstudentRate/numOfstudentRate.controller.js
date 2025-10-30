import { getNumOfStudentRate,setNumOfStudentRate } from "./numOfstudentRate.service.js";

export const setController = async(req,res) =>{
    const {formdata,part} = req.body;
    
    const result = await setNumOfStudentRate(formdata,part);
    return res.json(result)
}

export const getController = async(req,res) =>{

    try{
       const result = await getNumOfStudentRate();
    return res.json(result)
    }catch(e)
    {
    return [];
    }
    
}
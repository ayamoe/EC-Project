import { setTeacher,getTeacher } from "./teacher.service.js";

export const setController = async(req,res)=>{
    const teacher = req.body;
    const result = await setTeacher(teacher);

    return res.json({result});
}
export const getController = async(req,res)=> {
    try{
       const result = await getTeacher();

       return res.json(result)
    }catch(e){
        return [];
    }
    
    
}
import prisma from "../../config/prisma.js";

export const setTeacher = async(teacher)=>{
       const tea = await prisma.teacher.findFirst({
        where : {name : String(teacher.name)}
       })
    try{
        if(tea){
            await prisma.teacher.update({
                where : {id : tea.id},
                data : {
                    name : teacher.name,
                    email : teacher.email,
                    phone : teacher.phone,
                }

            })
        }else{
            await prisma.teacher.create({
        data: {
            name : teacher.name,
            email : teacher.email,
            phone : teacher.phone,

        }
         
    })
        }
       
     return "Data successfully  added"
    }catch(e){

    }
    
   
}
export const getTeacher = async ()=>{
    const data = prisma.Teacher.findMany({
    
        
    })
    return data;
}

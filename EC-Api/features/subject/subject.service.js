import prisma from "../../config/prisma.js";

export const setSubject = async(name,rid) =>{
 const rate = await prisma.numOfStudentPerRate.findFirst({
    where: {part : Number(rid)}
 })
 const sname = await prisma.subject.findFirst({
    where : {name : String(name)}
 })
 if(sname){
   return await prisma.Subject.update({
        where : { id : sname.id},
        data: {
            rateId : Number(rate.id),
        },
     
        select : {
            id : true,
            name: true,
            rateId : true,
        }
    })
 }else{
     return  await prisma.Subject.create({
       data: {
        rateId : Number(rate.id),
        name,
       },
        select : {
            id : true,
            name: true,
            rateId : true,
        }
    })


 }
   
}
export const getSubject = async ()=>{
    const data = await prisma.Subject.findMany({
            
           
    })
    return data;
}

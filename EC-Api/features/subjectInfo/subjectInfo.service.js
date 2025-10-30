import prisma from "../../config/prisma.js";

export const setSubjectInfo = async(rid,sid,subid,num) =>{
   const subinfo = await prisma.subjectInfo.findFirst({
    where : {serieId : Number(sid), subId : Number(subid)},
    select : {id : true}
   })
   
   if(subinfo){
   return await prisma.subjectInfo.update({
        where : {id : subinfo.id},
        data : {
            rateId : Number(rid),
            NumStudent : Number(num),
        },
        select : {
        subject: true,
        serie : true,
        NumOFRate : true,
       }
    })
   }
   return  await prisma.subjectInfo.create({
       data: {
        
        rateId : Number(rid),
        serieId : Number(sid),
        subId : Number(subid),
        NumStudent : Number(num),
       },   
       select : {
        subject: true,
        serie : true,
        NumOFRate : true,
       }
    })

}
export const getSubjectInfo = async ()=>{

    const data = await prisma.subjectInfo.findMany({
            include : {
                subject : {
                 select : {  name : true} ,
                },
                serie : true,
                NumOFRate : true,
                
            }
           
    })
    return data;
}

import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../../config/prisma.js"

import { Prisma } from "@prisma/client";
 export const getTeachinginfo = async(name,year,month)=> {
   try{
    const numericYear = year ? Number(year) : null;
    const numericMonth = month  ? Number(month) : null;

    let dateFilter = {};
    if (numericYear && !numericMonth) {
      // Only year provided — filter full year
      dateFilter = {
        createDate: {
          gte: new Date(numericYear, 0, 1),           // Jan 1st
          lt: new Date(numericYear + 1, 0, 1),         // Jan 1st next year
        },
      };
    } else if (numericYear && numericMonth) {
      // Year and month provided — filter that month
      dateFilter = {
        createDate: {
          gte: new Date(numericYear, numericMonth - 1, 1),
          lt: new Date(numericYear, numericMonth, 1),
        },
      };
    }
    // Name filter if provided
    const nameFilter = name
      ? {
        
            teacher: {
              name: String(name),
            },
        
        }
      : {};
     const whereCondition = {
      AND: [dateFilter, nameFilter],
    };

    const data = await prisma.teacherTeachingInfo.findMany({
         where : whereCondition ,
        include : {
            payments: true,
            series  : true,
            subjectinfo : {
                select : {
                  subject : {
                    select :{name : true}
                }
            },
                },
               
            teacher : true,
        }
    })
    
    return data ?? []  ;

   }catch(e){
          console.error("Error in getTeachinginfo:", e);
    return [];
   }

    
 }
 export const setTeachinginfo = async(sid,tid,serieid,tin,tout,duration,course,session,DofTeach,payment,amount,present) => {
    try{
        const teachinginfo= await prisma.teacherTeachingInfo.create({
         data : {
            subjectinfo: { connect: { id: Number(sid) } },
            teacher: { connect: { id: Number(tid) } },
            series: { connect: { id: Number(serieid) } },
            timeIn    : Number(tin),
            timeOut   : Number(tout),
            duration  : Number(duration),
            session   : session,
            course : course,
            dateOfTeach: new Date(DofTeach),
        
            
         },
         select : {id: true,session : true}

        
     })
      await prisma.payment.create({
            data: {
                teainfoId : Number(teachinginfo.id),
                payment : Number(payment),
                amount: amount !== undefined ? new Prisma.Decimal(amount) : new Prisma.Decimal(0),
                status : teachinginfo.session,
                present : new Prisma.Decimal(present)
            }
         })
     return teachinginfo
    }catch(e){
       console.log(e);
    }
   
 
 }
 export const deleteTeachinginfo = async(deleteid) => {
           
        await prisma.payment.deleteMany({
          where : {id : Number(deleteid)}
        })
        await prisma.teacherTeachingInfo.delete({
          where : {id : Number(deleteid)}
        })
 }
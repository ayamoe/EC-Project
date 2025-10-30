
import prisma from "../../config/prisma.js"

export const setPaymentRate = async(sub,serie,numofstudent,num)=>{

    const subjectinfo = await prisma.subjectInfo.findFirst({
        where : {subject :{ name : sub}, serie : {Series : serie} },
        include : {
            serie : true,
        }
    })
    const paymentrate = await prisma.paymentRate.findFirst({
        where : { 
            // Check  from paymentrate table of subjectinfo 
            // table of subject name is equal name of input sub 
               subjectinfo : { 
                  subject : {  
                     name : sub,
                 },
                },
                //Serie is equal name of input serie
                serie : {
                    is: {
                        Series : serie,
                    }
                }
        },
    
    })
    // If Name and Serie is Find ,
    // Update Data of PaymentRate table of Rate and Number of student
    if (paymentrate){
        
        await prisma.paymentRate.update({
            where : { id : paymentrate.id},
            data : {
                rate : Number(num),
                
            }
        })
        await prisma.subjectInfo.update({
            where : {id : paymentrate.subjectinfoId },
            data : {
                NumStudent :  Number(numofstudent)
            }
        })
        
    }
    // Is Not find input data in database paymentrate table
    // ADD  New data into the paymentrate table
    else{
      await prisma.paymentRate.create({
        data : {
            subjectinfoId : subjectinfo.id,
            serieId : subjectinfo.serie.id,
            rate : Number(num),
        }
      })

    }
 
    }

export const getPaymentRate = async ()=>{
    const data = prisma.paymentRate.findMany({
        include : {
                serie: true,
                subjectinfo : {
              include : {
                subject : true,
              }
              }
             
            
        }
    })
    return data;
}
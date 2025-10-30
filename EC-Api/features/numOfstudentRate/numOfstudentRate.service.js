import prisma from "../../config/prisma.js";

export const setNumOfStudentRate = async(data,p)=>{
    
 try {
 
    const existing = await prisma.numOfStudentPerRate.findFirst({
  where: { part : parseInt(p) },
  
});

    // Prepare dynamic update object
    const updateFields = {};
    data.forEach((item) => {
      updateFields[item.name] = parseInt(item.rate, 10);
    });
   
    if(existing){
        

    // Now update the row where part = '1'
    await prisma.numOfStudentPerRate.update({
      where: {
        id : existing.id, // Or any other identifying key
      },
      data: updateFields,
    });
    }else{
         console.log("hello")
        await prisma.numOfStudentPerRate.create({
            data : {
                
                part : parseInt(p),
                ...updateFields,
            }
        
        
    })
   

    
    }
   
    return "Data successfully updated"; 

    }catch(e){
       console.error("Error in setNumOfStudentRate:", e);
    }
   
}
export const getNumOfStudentRate = async ()=>{
    const data = await prisma.numOfStudentPerRate.findMany({})
    return data;
}

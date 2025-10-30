import prisma from "../../config/prisma.js";

    export const setSerie = async(nam)=>{
        
         await prisma.serie.create({
            data: {
            
               Series : String(nam)
            }
                
            
        })
        return "data is success"
        
    }
export const getSerie = async ()=>{
    const data = await prisma.serie.findMany({})
    return data;
}

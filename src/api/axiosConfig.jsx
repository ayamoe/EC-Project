
import axios from 'axios';

const api = "http://localhost:5000/api/v1"

export const getSubject = async() => {
    const res = await axios.get(`${api}/sub/get`);
    
    return res;
    
}
export const getTeacher = async()=>{
    const res= await axios.get(`${api}/tea/get`)

    return res;
}
export const getTeachingInfo= async(teacher,year,month) =>{
    const res = await axios.get(`${api}/teachinfo/get`,{
      params : {teacher : String(teacher),year:year,month:month},
      headers : { "Content-Type": "application/json" },
    })

    return res;
}
export const getPaymentRate= async() =>{
    const res = await axios.get( `${api}/pay/get`)
    return res;
}
export const getSerie = async() =>{
    const res = await axios.get(`${api}/serie/get`)
    return res;
}
export const getSubjectInfo = async()=>{
    const res = await axios.get(`${api}/subinfo/get`)
    return res;
}
export const setPaymentRate = async(sub,serie,num,rate) =>{

   await axios.post(`${api}/pay/set`, {
    
      sub : sub,
      serie : serie,
      numofstudent : Number(num),
      rate : Number(rate) ,
     
}, 
{
  headers: { "Content-Type": "application/json" }
});
}
export const getPayment = async (nameofteacher,year,month) => {
  try {
    const res = await axios.get(`${api}/payment/get`, {
      params: { name: String(nameofteacher),year:year,month: month },
      headers: { "Content-Type": "application/json" }
    });
    return res.data;
  } catch (error) {
    console.error("getPayment error:", error);
    throw error;  // caller ထံပို့ပါ
  }
};
export const getNumOfStudentPerRate = async() =>{
   const res = await axios.get(`${api}/numofstudentrate/get`)
   
   return res;
}
export const setSubject = async(name,rid)=>{
  const res =   await axios.post(`${api}/sub/set`,{
            name : name,
            rid : Number(rid),
            
            
    },
    {
  headers: { "Content-Type": "application/json" }
});
return res.data;
}
export const setSerieDB = async(name) => {
  const res = await axios.post(`${api}/serie/set`,{
         name ,
  
  },{
    headers : {"Content-Type" : "application/json"}
  })
  console.log(res)
  return res;
}
export const setSubjectInfos = async (rid, sid, subid, num) => {
    try {
        const res = await axios.post(
            `${api}/subinfo/set`,
            {
                rid: Number(rid),
                sid: Number(sid),
                subId: Number(subid),
                num: Number(num),
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return res; // return only the backend data
    } catch (error) {
        console.error("Error in setSubjectInfos:", error);
        return { error: "Failed to set subject info" }; // safe fallback
    }
};
export const setTeacher = async(teacher) => {
    await axios.post(`${api}/tea/set`,teacher, {
  headers: { "Content-Type": "application/json" }
})
    
}
export const setTeachingInfo = async(subid,tid,sid,tin,tout,dur,session,course,tdate,present)=>{
    await axios.post(`${api}/teachinfo/set`,{
        subid : Number(subid),
        tid : Number(tid),
        serieid : Number(sid),
        intime : Number(tin),
        outtime : Number(tout), 
        duration : Number(dur),
        session : session,
        course : course,
        DofTeach : tdate,
        present : Number(present),
    },
        {
  headers: { "Content-Type": "application/json" }
})
return "Successfully Teaching_Info_Table To  Data Added"
}
  export const numofstudentrate = async(formdata,part)=>{
    await axios.post(`${api}/numofstudentrate/set`,{   
       formdata ,part
    },
    {
      headers : {"Content-Type " : "application/json" }
    }

    )

  }
  export const deleteTeachinginfo = async(id)=>{
    await axios.delete(`${api}/deleteteachinginfo/delete/${id}`);
  }
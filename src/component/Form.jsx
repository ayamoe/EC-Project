import { TextField,Box ,Button} from "@mui/material";
import { useEffect ,useState} from "react";
import {setPaymentRate,getSubject,getSerie,setSubject,getSubjectInfo,setSubjectInfos} from "../api/axiosConfig";
import { useApp } from "../ThemedApp";
export default function Form(){
      const {showForm,series,subject,subjectinfo,mode,setMode}= useApp(); // To Show For Subject And Payment Rate

      
      const [subSerie,setSubSerie] = useState("");
      
      const [sname,setSName] = useState(""); 
      const [error,setError]= useState(""); 
      const [snum,setSNum]= useState("") // To add numofstudent to subject table 
      const [part,setPart]= useState("")
    
    const Rate = (num,subjectinfos) => {
    
        const name = showForm ? selectedName : sname;
        
        const d = subjectinfos.find(data => data.subject.name === String(name) && data.serie.Series === String(subSerie) )
        
        const n = parseInt(num, 10) || 0;
        
        return n <= 9 ?  d.NumOFRate.underNine :
                       n <= 14 ? d.NumOFRate.underfourteen : 
                       n <= 20 ? d.NumOFRate.underTwenty :
                       n <= 40 ? d.NumOFRate.underFourty :
                       n <= 60 ? d.NumOFRate.underSixty:
                       n <= 80 ? d.NumOFRate.underEighty: d.NumOFRate.underHundered ;
      }

    const addSubinfo = (newsubid,serid,rid)=> {
       return setSubjectInfos(rid,serid,newsubid,snum)    
      }

    const addSubject = async()=> {
          // to check subject adding table part data from select of payment table id
          const confirmed = window.confirm("Are you sure you want to Change this record?");
        if(confirmed){
          const ser = await series.find(s => s.Series === String(subSerie))
        
       
          const newSub = await setSubject(sname,part || 0)
          const newSubinfo = await addSubinfo(newSub.id,ser.id,newSub.rateId);
          const rate = await Rate(snum,[newSubinfo.data])
          await setPaymentRate(newSub.name,subSerie,snum,rate);  
           setMode(!mode)
           
             alert("Subject added successfully!");
        }
         
      }
     
      
      return(
        
          <Box sx={{ p: 4, width: "550px", display: "flex", flexDirection: "column", gap: 2 }} style={{ backgroundColor: "lightcyan" }}>
        
  
      

      <div style={{ paddingTop: 20 }}>
        <label style={{ paddingRight: 30 }}>Select Serie</label>
        <select
          value={subSerie}
          onChange={(e) => setSubSerie(e.target.value)}
          className="p-2 border rounded-lg w-60"
        >
          <option value="">choose</option>
          {series.map((data) => (
            <option key={data.id} value={data.Series}>
              {data.Series}
            </option>
          ))}
        </select>
      </div>
        <div style={{ paddingTop: 20 }}>
        <label style={{ paddingRight: 10 }}>Total Student</label>
        <input
          type="text"
          value={snum}
          onChange={(e) => setSNum(e.target.value)}
          className="p-2 border rounded-lg w-60"
          style={{ width: "180px" }}
        />
      </div>

  
        <div style={{ paddingTop: 20 }}>
          <label style={{ paddingRight: 10 }}>Select Name</label>
          <input
            type="text"
            value={sname}
            onChange={(e) => setSName(e.target.value)}
            list="subjectList"
            className="p-2 border rounded-lg w-60"
          />
          <datalist id="subjectList">
            {subject.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </datalist>

          <label style={{ paddingLeft: 10 }}>Select Part</label>
          <input
            type="text"
            value={part}
            onChange={(e) => setPart(e.target.value)}
            className="p-2 border rounded-lg w-60"
          />
          <div style={{paddingLeft : 30,paddingTop : 30}}> 
             <Button  variant="contained" onClick={addSubject}>
                Add Subject
              </Button>

          </div>
         
        </div>
    

      
        
  
    
    </Box>
  );
}
      
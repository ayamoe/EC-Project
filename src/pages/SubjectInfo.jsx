
import {useState} from "react";
import { useApp } from "../ThemedApp";
import Form from "../component/Form";
const TeacherList = () =>{
    const {setShowForm,loading} = useApp();
    const {mode,subjectinfo} = useApp();
    const [rate,setRate] = useState([])

    setShowForm(false) // To Use For Subject And NumberOF Student Adding

    if(loading){
      return <h1>Loading...</h1>
    }
  
  return(
    <div style={{
          maxHeight: "530px",   // table ကို fixed height ပေး
          overflowY: "auto", 
          overflowX: "auto",   // vertical scroll enable
          border: "1px solid #ccc",
        }}>
<Form />
    <div style={{padding : 20}}>
        <table border="1" cellPadding="5">
            <thead>
                <tr style={{backgroundColor : "lightpink"}}>
                        <th>ID</th>
                        <th>rateId</th>
                        <th>SubID</th>
                        <th>SubName</th>
                        <th>Serie</th>
                        <th>Num Of Student</th>
                        
                  </tr>
            </thead>

            <tbody>
                {subjectinfo.map((sub)=> (
                    <tr key={sub.id} style={{backgroundColor : "lightcyan"}}>
                        <td style={{ padding: "8px 16px" }}>{sub.id}</td>
                        <td style={{ padding: "8px 16px" }}>{sub.rateId}</td>
                        <td style={{ padding: "8px 16px" }}>{sub.subId}</td>
                        <td style={{ padding: "8px 16px" }}>{sub.subject.name}</td>
                        <td style={{ padding: "8px 16px" }}>{sub.serie.Series}</td>
                        <td style={{ padding: "8px 16px" }}>{sub.NumStudent}</td>
                    </tr> 
                    
                ))}
            </tbody>
        </table>   
    </div>
            
    </div>
   )
}

export default TeacherList;


   
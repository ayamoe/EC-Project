import { Button } from "@mui/material";
import Paymentrateid from "../component/Paymentrateid";
import { useApp } from "../ThemedApp";
import Form from "../component/Form";
import { useState } from "react";
import FilterPaymentRate from "../Filter/FilterPaymentRate";

const TeacherList = () =>{
    const {setShowForm,loading} = useApp();
    const [filterData,setFilterData] = useState([]);
    
    const [selectid,setSelectId]= useState()
    setShowForm(true) //To Use PaymentRate Adding Form
    const ShowRate= (id)=>{
       setSelectId(id)
    }
    const handleFilteredData = (data) =>{
        setFilterData(data)
    }
     if(loading){
        return <h1>Loading...</h1>
      }

  return( 
    <div style={{
          maxHeight: "530px",   // table ကို fixed height ပေး
          overflowY: "auto",    // vertical scroll enable
          border: "1px solid #ccc",
        }}>         
      
       <Paymentrateid id={selectid} />
       <div style={{ maxHeight: "400px",
                    overflowY: "auto"   ,
          border: "1px solid #ccc" ,padding : 20}} >
            <table border="1" cellPadding="5">
            <thead>
                <tr style={{backgroundColor : "GrayText"}}>
                        <th>ID</th>
                        <th>RateID</th>
                        <th>Name</th>
                        <th>Num OF Student</th>
                        <th>Payment Rate</th>
                        <th>
                            <FilterPaymentRate onFilter={handleFilteredData}/>
                        </th>
                  </tr>
            </thead>
            <tbody>
                {filterData.map((sub)=> (
                    <tr key={sub.id} style={{backgroundColor : "lightcyan"}}>
                        <td style={{ padding: "8px 16px" }}>{sub.id}</td>
                        <td style={{padding : "8px 16px"}}>
                            <Button onClick={()=>ShowRate(sub.subjectinfo.rateId)}>{sub.subjectinfo.rateId}</Button>
                            </td>
                        <td style={{ padding: "8px 16px"}}>{sub.subjectinfo?.subject.name}</td>
                        <td Style={{padding: "8px 16px"}}>{sub.subjectinfo?.NumStudent}</td>
                        <td Style={{padding: "8px 16px"}}>{sub.rate}</td>
                        <td Style={{padding: "8px 16px"}}>{sub.serie?.Series}</td>
                        
                    </tr> 
                ))}
            </tbody>
       
        </table>
            
        

       </div>
        
        
    </div>
   )
}

export default TeacherList;


   
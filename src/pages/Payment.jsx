import { useApp } from "../ThemedApp"
import { Box, Typography } from "@mui/material";
import FilterYearMonth from "../Filter/FilterYearMonth";
import FilterPayment from "../Filter/FilterPayment";
import { useState } from "react";



const payment = ()=> {
    const {totalAmount,auth,month,loading,year} = useApp();
    const [filterdata,setFilterdata]= useState([])
    const handleFilteredData = (data)=> {
        setFilterdata(data)
    }
   
  
  const toHourMinute= (totalMinutes)=> 
         // To Change Number Minute "457min" To HH:MM format
        {
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;
                return `${hours}:${minutes.toString().padStart(2, '0')}`;
        }
        if(loading){
            return <h1>Loading...</h1>
        }
  return  (
    <Box>
          <h1>Payment</h1>
    <div  style={{
          maxHeight: "850px",   // table ကို fixed height ပေး
          overflowY: "auto", 
          overflowX: "auto",   // vertical scroll enable
          border: "1px solid #ccc",
        }} >
            
    <FilterYearMonth/>
       
        <table border="1" cellPadding="5">
            <thead>
                <tr style={{backgroundColor : "lightblue"}}>
                    <th>Teacher</th>
                    <th>Total Hour</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>Session</th>
                    <th>Precent</th>
                    <FilterPayment onFilter={handleFilteredData}/>
                    <th>Date_OF_Created</th>    
                </tr>

            </thead>
            <tbody>
                {filterdata.map(data => (
                    <tr key={data.id} style={{backgroundColor : "lightcyan"}}>
                            <td style={{ padding: "8px 16px" }}>{data.teachingInfo.teacher.name}</td>
                            <td style={{ padding: "8px 16px" }}>{toHourMinute(data.teachingInfo.duration)}</td>
                            <td style={{ padding: "8px 16px" }}>{data.payment}</td>
                            <td style={{ padding: "8px 16px" }}>{data.amount}</td>
                            <td style={{ padding: "8px 16px" }}>{data.status}</td>
                            <td>{data.present}</td>
                            <td style={{ padding: "8px 16px" }}>{data.teachingInfo.series.Series}</td>
                            <td style={{ padding: "8px 16px" }}>{data.teachingInfo.subjectinfo.subject.name}</td>
                            
                            <td style={{ padding: "8px 16px" }}>{data.createdAt}</td>
                    </tr>
                ))}

            </tbody>
        </table>
        
    </div>
       <Typography style={{paddingTop : 30}}>{auth ? auth : ""}({year}/{month ? month : "Total Amount"})------- Total Amount __ {totalAmount}KS</Typography>
     </Box>
  )
}
export default payment;
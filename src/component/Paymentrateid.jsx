import { useEffect, useState } from "react";
import { useApp } from "../ThemedApp";

const Paymentrateid = ({id}) => {
  const { numofstuPerRate,mode } = useApp();
  const [filterdata,setFilterdata] = useState([])
  useEffect(()=>{
    
          const filtered = numofstuPerRate.filter((data)=>{
             return  data.id === id 
          } )
          setFilterdata(filtered);
          
  },[id,mode])

  return (
    <div style={{ padding: 20 }}>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Category</th>
            <th>UnderNine</th>
            <th>UnderFourteen</th>
            <th>underTwenty</th>
            <th>underFourty</th>
            <th>underSixty</th>
            <th>underEighty</th>
          </tr>
        </thead>
        <tbody>
         {filterdata.map(data=>(
            <tr key={data.id}>
                <th>Part {data.part}</th>
                <th>{data.underNine}</th>
                <th>{data.underfourteen}</th>
                <th>{data.underTwenty}</th>
                <th>{data.underFourty}</th>
                <th>{data.underSixty}</th>
                <th>{data.underEighty}</th>
                <th>{data.underHundered}</th>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
  );
};

export default Paymentrateid;

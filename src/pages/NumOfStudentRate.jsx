import { useScrollTrigger } from "@mui/material";
import { useApp } from "../ThemedApp";
import NumOFStundentRateForm from "../component/NumOfStudentRateForm";
import { useState } from "react";
const NumOfStudentRate = () => {
    const {numofstuPerRate,loading}= useApp();

    if(loading){
        return <h1>Loading..</h1>
    }
    return(
    
    <div >
      <NumOFStundentRateForm />
       <div style={{padding : 20}}>
           <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Category</th>
            {numofstuPerRate.map((_, index) => (
              <th key={index}>Rate {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Under Nine</th>
            {numofstuPerRate.map((data, index) => (
              <td key={index}>{data.underNine}</td>
            ))}
          </tr>
          <tr>
            <th>Under Fourteen</th>
            {numofstuPerRate.map((data, index) => (
              <td key={index}>{data.underfourteen}</td>
            ))}
          </tr>
          <tr>
            <th>Under Twenty</th>
            {numofstuPerRate.map((data, index) => (
              <td key={index}>{data.underTwenty}</td>
            ))}
          </tr>
          <tr>
            <th>Under Fourty</th>
            {numofstuPerRate.map((data, index) => (
              <td key={index}>{data.underFourty}</td>
            ))}
          </tr>
          <tr>
            <th>Under Sixty</th>
            {numofstuPerRate.map((data, index) => (
              <td key={index}>{data.underSixty}</td>
            ))}
          </tr>
          <tr>
            <th>Under Eighty</th>
            {numofstuPerRate.map((data, index) => (
              <td key={index}>{data.underEighty}</td>
            ))}
          </tr>
          <tr>
            <th>Under Fourteen</th>
            {numofstuPerRate.map((data, index) => (
              <td key={index}>{data.underHundered}</td>
            ))}
          </tr>

        </tbody>
      </table>
       </div>
           
        </div>
    )
    
}
export default NumOfStudentRate;
import { useEffect, useState } from "react";
import { useApp } from "../ThemedApp"

const FilterPayment = ({onFilter})=> {
    const {payments,series,subject} = useApp();
    const [sub,setSub]= useState('Subject')
    const [serie,setSerie] = useState("Serie")
    useEffect(()=> {
        const Filter = payments.filter(data => {
            const matchserie = serie === "Serie" || data.teachingInfo.series.Series === String(serie)
            const matchsubject = sub === "Subject" || data.teachingInfo.subjectinfo.subject.name === String(sub)
            return matchserie && matchsubject;
        })
        onFilter(Filter)
    },[sub,serie,payments])
    return (
    <>
       <th style={{padding: '20px',width: '10',height : '2'}}>
                                
          <select value={serie} onChange={(e)=> setSerie(e.target.value)} className="p-2 border rounded-lg w-60"   style={{paddingInlineEnd : 20}}>
                <option value="Serie">serie</option>
                {series.map(data =>
                <option key={data.id} value={data.Series}>{data.Series}</option>
                )}
           </select> 
        </th>
        <th style={{padding: '20px',width: '10',height : '2'}}>
                                
            <select value={sub} onChange={(e)=> setSub(e.target.value)} className="p-2 border rounded-lg w-60"   style={{paddingInlineEnd : 20}}>
               <option value="Subject">subject</option>
                    {subject.map(data =>
                <option key={data.id} value={data.name}>{data.name}</option>
              )}
            </select>
         </th>
     
       </>
  );
}
export default FilterPayment;



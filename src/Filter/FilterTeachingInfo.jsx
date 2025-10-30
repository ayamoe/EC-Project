import { useState, useEffect } from "react";
import { useApp } from "../ThemedApp";
export default function FilterComponent({ onFilter }) {
  const [serie, setSerie] = useState("Serie");
  const [sub, setSub] = useState("Subject");
  const {teachInfo,series,subject} = useApp()

  useEffect(() => {
    const filtered = teachInfo.filter((data) => {
      const matchesSerie = serie === "Serie" || data.series.Series === String(serie);
      const matchesSubject = sub === "Subject" || data.subjectinfo.subject.name === String(sub);
      return matchesSerie && matchesSubject;
    });

    // 🔄 Parent component ကို filtered data ပြန်ပေး
    onFilter(filtered);
  }, [serie, sub,teachInfo]); // dependencies ပြောင်းတိုင်း filter ပြန်လုပ်

  return (
    <>
       <td style={{padding: '20px',width: '10',height : '2'}}>
                                
          <select value={serie} onChange={(e)=> setSerie(e.target.value)} className="p-2 border rounded-lg w-60"   style={{paddingInlineEnd : 20}}>
                <option value="Serie">serie</option>
                {series.map(data =>
                <option key={data.id} value={data.Series}>{data.Series}</option>
                )}
           </select> 
        </td>
        <td style={{padding: '20px',width: '10',height : '2'}}>
                                
            <select value={sub} onChange={(e)=> setSub(e.target.value)} className="p-2 border rounded-lg w-60"   style={{paddingInlineEnd : 20}}>
               <option value="Subject">subject</option>
                    {subject.map(data =>
                <option key={data.id} value={data.name}>{data.name}</option>
              )}
            </select>
         </td>
     
       </>
  );
}

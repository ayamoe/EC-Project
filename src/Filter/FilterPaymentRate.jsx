import { useEffect } from "react";
import { useApp } from "../ThemedApp";
import { useState } from "react";
const FilterPaymentRate=({onFilter})=>{
    const {series,paymentrates} = useApp()
    const [serie, setSerie] = useState("Serie");

    useEffect(()=> {
            const filtered = paymentrates.filter((data)=> {
                return  serie === "Serie" || data.serie.Series === String(serie) ;
            })
            onFilter(filtered)
    },[serie])
    return (
        <div>
              <select value={serie} onChange={(e)=> setSerie(e.target.value)} className="p-2 border rounded-lg w-60"   style={{paddingInlineEnd : 20}}>
                <option value="Serie">serie</option>
                {series.map(data =>
                <option key={data.id} value={data.Series}>{data.Series}</option>
                )}
           </select> 
        </div>
    )
}
export default FilterPaymentRate;
import { useEffect, useState } from "react";
import { useApp } from "../ThemedApp";
import { setSerieDB } from "../api/axiosConfig";
const Serie = () => {
    const {series,setSerie,mode,setMode} = useApp()
    
    const [name,setName]= useState('')
    const setdata = () => {
          
        setSerieDB(name)
        
            setMode(!mode)
          
    }
    
    return (
        <div>
            <form>
                <label style={{padding: 20}}>Name</label>
                <input
                        type="text"
                        list="time-options"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded-lg w-60"
                        style={{ width: "180px" }}
                    /> 
                    <button  onClick={()=> setdata()}>Add</button>
            </form>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {series.map(data =>(
                         <tr key={data.id} >
                            <th>{data.id}</th>
                            <th>{data.Series}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}
export default Serie;
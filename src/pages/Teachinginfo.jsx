        import { useApp } from "../ThemedApp";
        import { useState } from "react";
        import FilterYearMonth from "../Filter/FilterYearMonth";
        import FilterComponent from "../Filter/FilterTeachingInfo";
        import { deleteTeachinginfo } from "../api/axiosConfig";
        import teachinfoexcel from "../Save/teachinfoexcel";
        export const toHourMinute= (totalMinutes)=> 
                // To Change Number Minute "457min" To HH:MM format
                {
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;
                        return `${hours}:${minutes.toString().padStart(2, '0')}`;


                }

        export default function Teachinginfo(){
            const {loading,mode,setMode} = useApp(); // To Get TeachingInfo Data From ../ThemedApp
            const [filteredData, setFilteredData] = useState([]);
            
            const deleteteachinginfo = (id)=>{
                const confirmed = window.confirm("Are you sure you want to delete this record?");
                    if (confirmed) {
                        deleteTeachinginfo(id);
                        setMode(!mode);
                    }
                            }
            const handleFilteredData = (data) => {
                setFilteredData(data); // ⬅️ Filter result များကို state ထဲထည့်
            }; 
           


            if(loading)
            {
                return <h1>Loading...   </h1>
            }
            
            return(
                <div  style={{
                maxHeight: "450px",   // table ကို fixed height ပေး
                overflowY: "auto", 
                overflowX: "auto",   // vertical scroll enable
                border: "1px solid #ccc",
                }}>
                    <button onClick={()=> teachinfoexcel(filteredData)} variant="contained" color="success">
                        Export to Excel
                    </button>
                    
                <FilterYearMonth/>
                <div style={{backgroundColor : "lightgreen"}}>
                    <table border="1" cellPadding="5">
                    
                        <thead>
                            <tr style={{backgroundColor : "lightblue"}}>
                                <td>id</td>
                                <td style={{ padding: '20px',width: '20',height : '1'}}>Teach Date</td>
                                <td style={{padding: '20px',width: '20',height : '1'}}>Session</td>
                                <td style={{padding: '20px',width: '20',height : '1'}}>Time In</td>
                                <td style={{padding: '20px',width: '20',height : '1'}}>Time Out</td>
                                <td style={{padding: '20px',width: '20',height : '1'}}>Duration</td>
                                <td style={{padding: '20px',width: '50',height : '0.5'}}>course</td>
                                <FilterComponent  onFilter={handleFilteredData} />                              
                                <td style={{padding: '20px',width: '10',height : '1'}}>Teacher</td>
                                <td style={{padding: '20px',width: '10',height : '1'}}>Create Date</td> 
                                <td style={{padding: '20px',width: '10',height : '1'}}>Delete</td>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(row=> (
                                <tr key={row.id
                                } style={{backgroundColor : "white  "}} >
                                    <td>{row.id} </td>
                                    <td style={{textAlign : 'center',padding: "2px 8px" }}>{new Date(row.dateOfTeach).toLocaleDateString('en-CA')}</td>
                                    <td style={{textAlign : 'center',padding: "2px 8px" }}>{row.session}</td>
                                    <td style={{textAlign : 'center',padding: "2px 8px" }} >{toHourMinute(row.timeIn)}</td> 
                                    <td style={{textAlign : 'center',padding:  "2px 8px" }}>{toHourMinute(row.timeOut)}</td>
                                    <td style={{textAlign : 'center',padding: "2px 8px" }}>{(row.duration)/60}</td>
                                    <td style={{textAligh : "center",padding: "2px 8px"}}>{row.course}</td>
                                    <td style={{textAlign : 'center',padding: "2px 8px" }}>{row.series.Series}</td>
                                    <td style={{textAlign : 'center',padding: "2px 8px" }}>{row.subjectinfo.subject.name}</td>
                                    <td style={{textAlign : 'center',padding: "2px 8px" }}>{row.teacher.name}</td>
                                    <td style={{textAlign : 'center',padding: "2px 8px" }}>{new Date(row.createDate).toLocaleDateString('en-CA')}</td>
                                    <td>
                                        <button onClick={()=> deleteteachinginfo(row.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                    
                </div>
            )
        }
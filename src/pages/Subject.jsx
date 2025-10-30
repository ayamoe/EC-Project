import { useApp } from "../ThemedApp"

const Subject= ()=>{
    const {subject,loading} = useApp()
    if(loading){
      return <h1>Loading...</h1>
    }
    return (
        <div>
            <table border="1" cellPadding="5">
                <thead>
                    <tr style={{backgroundColor : "GrayText"}}>
                        <td>ID</td>
                        <td>RateId</td>
                        <td>Name</td>

                    </tr>
                </thead>
                <tbody>
                    {subject.map(data=>(             
                        <tr key={data.id} style={{backgroundColor : "lightcyan"}}>
                            <td>{data.id}</td>
                            <td>{data.rateId}</td>
                            <td>{data.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )



}
export default Subject;
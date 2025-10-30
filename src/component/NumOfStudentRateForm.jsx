import { numofstudentrate } from "../api/axiosConfig";
import { useApp } from "../ThemedApp";
import { useState } from "react";
import { Button } from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material"
const NumOFStundentRateForm=()=>{
    const {setLoading,loading} = useApp()
    const [part,setPart]= useState('')
    
    const [formData, setFormData] = useState([
    { id: 1, name: "", rate: "" },
    
  ]);

    const handleAddForm = () => {
    const newForm = {
      id: formData.length + 1,
      name: "",
      rate: "",
    };
    setFormData([...formData, newForm]);
  };
   
   const handleChange = (index, field, value) => {
  const updatedForm = [...formData]; // array ကို copy
  updatedForm[index][field] = value; // ရွေးထားတဲ့ item ကို ပြင်
  setFormData(updatedForm); // ပြန် set
};
const handleDeleteForm = (index) => {
  const updatedForm = [...formData];
  updatedForm.splice(index, 1); // Remove one item at the given index
  setFormData(updatedForm);
};

const SubmitForm= ()=>{
             numofstudentrate(formData,part)
             setLoading(true)
             
    }

    if(loading){
      return <h1>Loading...</h1>
    }
    return(
        <div>
          <form style={{backgroundColor : "lightblue",maxWidth : "600px"}}>
            <div style={{padding : "20px"}}>
               <label style={{paddingLeft : 20 ,paddingRight : 20,paddingTop : 20}}>Part</label>
                    <input
                    label="Part"
                    value={part}
                    onChange={(e) => setPart( e.target.value)}
                    
                    />  
                        <Button  onClick={()=> handleAddForm()}>
                        <AddIcon/>
                        </Button>
          <div style={{paddingTop : 20}}>
                {formData.map((item, index) => (
                        <form key={item.id} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                            <label>column</label>
                                <input
                                label="Name"
                                value={item.name}
                                onChange={(e) => handleChange(index, "name", e.target.value)}
                                />
                            <label>Amount</label>
                                <input
                                label="Rate"
                                value={item.rate}
                                onChange={(e) => handleChange(index, "rate", e.target.value)}
                                />
                            <button onClick={()=> handleDeleteForm(index)}>delete</button>
                        </form>
                        ))}      
                     <button style={{MozPaddingEnd : 20}} onClick={() => SubmitForm()}>Submit</button>
                  </div>       
               </div>
           </form > 
        </div>
    )
}
export default NumOFStundentRateForm;
import {Box,AppBar,Toolbar,IconButton,Typography,TextField} from "@mui/material"
import {
    Menu as MenuIcon,
    Add as AddIcon,
    

} from "@mui/icons-material"
import { useApp} from "../ThemedApp";
import {  useNavigate, useNavigation } from "react-router-dom";
import { useState} from "react"
import { use } from "react";

export default function ToolBar(){
    const {setShowDrawer,showDrawer,setAuth,teachers,setTeacher,loading,setLoading} = useApp();
    const [tea,setTea] = useState("");
    
    const navigate = useNavigate();
    const showTeainfoForm = ()=>{
        setLoading(true)
        navigate('/teachinginfoadd')
        setTimeout(() => {
      setLoading(false);
    }, 500);

    }
    const Find = ()=>{
        setAuth(tea);
        setTeacher(tea)
        
        if(tea){
          navigate('/teachinginfo')
        }else{
            navigate('/teachinginfo')
        }   
        
    }
    
    return (
        <Box>
           <AppBar position="static">
            <Toolbar>

                <IconButton color="Green" edge="start" onClick={()=>setShowDrawer(!showDrawer)}>
                   <MenuIcon />
                </IconButton>

                <Typography sx={{ flexGrow: 1, ml: 2 }}>Honarable</Typography>
                
                 
            <Box sx={{display : 'flex', flexGrow : 1,alignItems : "center"}}>   
                <label style={{paddingRight: 20,paddingLeft : 20}}>Select Teacher</label>
                   <select value={tea} onChange={(e)=> setTea(e.target.value)} className="p-2 border rounded-lg w-60"   style={{paddingInlineEnd : 20, paddingRight : 30}}>
                     <option value="">All Info </option>
                       {teachers.map(data =>
                     <option key={data.id} value={data.name}>{data.name}</option>
                     )}
                   </select>
                     <IconButton sx={{padding : '2px'}} onClick={()=> Find()}>
                        Search
                     </IconButton>

                </Box>  
                
                <Box>
                    <IconButton color="red" edge="end" onClick={()=> showTeainfoForm()}>
                        <AddIcon/>
                    </IconButton>
                </Box>

            </Toolbar>

        </AppBar>
        
        </Box>
        
    )
    
        
    
}
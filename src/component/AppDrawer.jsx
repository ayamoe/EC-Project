    import {
        Box,
        
        Divider,
        List,
        ListItem,
        ListItemButton,
        ListItemIcon,
        ListItemText,
        Avatar,
        Typography,
        
    } from "@mui/material";
    import { useApp } from "../ThemedApp";

    import {
        Logout as LogoutIcon,
        School as SchoolIcon,
  MonetizationOn as MonetizationOnIcon,
  ListAlt as ListAltIcon,
  Subject as SubjectIcon,
  People as PeopleIcon,
        
    } from "@mui/icons-material";
    import { useNavigate } from "react-router-dom";

    export default function AppDrawer(){
        const {auth,setLoading} = useApp();
        const navigate = useNavigate();
        const name = auth ? auth : "Excellent Choice"
        const handleNavigate = (path) => {

    setLoading(true);


    navigate(path);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
        
        return (
            <div style={{backgroundColor : "lightyellow" ,maxHeight: "600px",   
          overflowY: "auto"}}>
            
            <Box 
                sx={{
                    mb:5,
                    width: "250px",
                    height: 140,
                    position: "relative",
                    display : "flex",
                    
                }}>
                    <Box sx={{
                        gap: 2,
                        display: "flex",
                        alignItems: "center",
                        position: "absolute",
                        left: 20,
                        bottom: -5,
                        flexDirection : "column"
                    }}>
                        <Avatar
                        src="https://images.unsplash.com/photo-1598283942314-624d3688627d?auto=format&fit=crop&w=800&q=80"
                        sx={{
                            width: 95,
                            height: 95,
                            color: "white",
                            flexGrow : 1,
                    
                        }}/>
                        <Typography sx={{fontWeight: "bold"}}>{name}</Typography>

                    </Box>
                </Box>

                {auth && (
                    <List>
                        
                
                    <ListItem>
                        <ListItemButton onClick={()=> handleNavigate('/teachinginfo')} >
                            <ListItemIcon>
                                <LogoutIcon color="error"/>
                            </ListItemIcon >
                            <ListItemText>Course</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=>handleNavigate('/payment')}>
                            <ListItemIcon>  
                            
                            </ListItemIcon>
                            <ListItemText>Payment</ListItemText>
                        </ListItemButton>
                    </ListItem>
                <Divider/>
                    
                        

                    <Divider/>
                    

                </List>
                    
                )}
                {!auth && (
                    
                    <List>
                        <ListItem>
                        <ListItemButton onClick={()=> handleNavigate('/teacher')}>
                            <ListItemIcon>  
                              <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText>Teacher List</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem>
                        <ListItemButton onClick={()=> handleNavigate('/teachinginfo')}>
                            <ListItemIcon>  
                             <ListAltIcon/>
                            </ListItemIcon>
                            <ListItemText>Teaching Info</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem>
                        <ListItemButton onClick={()=> handleNavigate('/Subject')}>
                            <ListItemIcon>  
                              <SubjectIcon/>
                            </ListItemIcon>
                            <ListItemText>Subject</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> handleNavigate('/Subjectinfo')}>
                            <ListItemIcon>  
                             <ListAltIcon/>
                            </ListItemIcon>
                            <ListItemText>Subjectinfo</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem>
                        <ListItemButton onClick={()=> handleNavigate('/paymentrate')}>
                            <ListItemIcon>  
                              <MonetizationOnIcon/> 
                            </ListItemIcon>
                            <ListItemText>Payment Rate</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> handleNavigate('/NumOfStudentRate')}>
                            <ListItemIcon>  
                              <SchoolIcon/>
                            </ListItemIcon>
                            <ListItemText>Student Per Rate</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> handleNavigate('/payment')}>
                            <ListItemIcon>  
                            
                            </ListItemIcon>
                            <ListItemText>Payment</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=>handleNavigate('/serie')} >
                            <ListItemIcon>
                    
                            </ListItemIcon >
                            <ListItemText>Seire</ListItemText>
                        </ListItemButton>
                    </ListItem>
                <Divider/>
                    
                        
                    </List>
                )}
                    
                

        </div>
            
        );
    }
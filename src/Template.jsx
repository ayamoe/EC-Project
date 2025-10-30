import { Box, Container, Toolbar } from "@mui/material";
import AppDrawer from "./component/AppDrawer";
import ToolBar from "./component/ToolBar"
import { useApp } from "./ThemedApp";
import { Outlet } from "react-router-dom";

export default function MainLayout() {

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" ,backgroundColor : "lightskyblue"}}>
      {/* Top toolbar */}
      <ToolBar />

      {/* Main content area */}
      
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" ,paddingTop :1}}>
        {/* Sidebar */}
         <AppDrawer/>

        {/* Main content */}
        <Box
          sx={{
            flexGrow: 1,
            flexDirection: "column",
            overflow: "hidden",
            p: 2,
          }}
        >
          {/* TeaInfoForm */}
         

          {/* Scrollable Outlet */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 1 ,justifyContent: "center", // horizontal center
    alignItems: "center",   }}>
            <Container >
              <Outlet />
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

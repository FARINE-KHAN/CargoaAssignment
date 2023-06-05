import React from 'react'
import { Link } from 'react-router-dom'
import {Box, Button, Typography} from "@mui/material"
const Home = () => {
  return (
    <Box
    sx={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center", 
      flexDirection:"column",
      padding:"10rem",
      margin:"4rem"

    }}>
      <Typography variant="h2" style={{fontWeight:"bolder",marginBottom:"2rem"}}>Welcome to <span style={{color:"#1565C0"}}>CARGAO</span></Typography>
     <div style={{ "display": "grid",
  "gridTemplateColumns": "auto auto auto auto",
  "gap": "10px",
  "padding": "30px"}}><Link to="/manufacturer/login"><Button variant="contained"style={{marginRight:"2rem"}}>Manufacturer</Button ></Link>
      <Link to="/transporter/login"><Button variant="contained">Transporter</Button></Link>
    </div>
     </Box>
  )
}
//  style={{"display":"flex","justifyContent":"center","alignItems":"center","flex":"column"}}
export default Home

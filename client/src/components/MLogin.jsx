import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";

  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import { Button, FormControl, FormGroup, Input, InputLabel, Typography, styled } from "@mui/material";

  const Container = styled(FormGroup)`
  width:30%;
margin:5% auto 5% auto;
& > div{
    margin-top:20px;
}
  `;
  const MLogin = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password:"",
  });
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3001/mLogin", inputs);
      localStorage.setItem("user",JSON.stringify(res.data))
      toast.success(res.data,toastOptions)
      navigate("/manufacturer/dashboard");
 
    } catch (err) {
      toast.error(err.response.data, toastOptions);
    }
  };
  return (
    <Container >
      <div>
        <Typography variant="h3">Manufacturer <span style={{color:"#1565C0"}}>Login</span> </Typography>
      </div>
    
      <FormControl>
          <InputLabel>Email</InputLabel>
          <Input placeholder='Enter email' type='email' name='email' onChange={handleChange} />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input  placeholder='Enter password' type='password' name='password'onChange={handleChange} />
        </FormControl>
      <FormControl>
            <Link to="/manufacturer/dashboard"><Button  variant="contained" onClick={handleSubmit} style={{margin:"1rem"}}>Login</Button></Link>
            <p >New member ?<Link to="/manufacturer/register" style={{ textDecoration: "none" }}>
            <span>&nbsp;Register</span></Link></p>
</FormControl>
      
      <ToastContainer/>
    </Container>
  )
}

export default MLogin

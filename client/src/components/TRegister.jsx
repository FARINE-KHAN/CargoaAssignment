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
  
const TRegister = () => {
 
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    password:"",
  });
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3001/tRegister", inputs);
      toast.success(res.data,toastOptions)
      navigate("/transporter/login");
    } catch (err) {
      toast.error(err.response.data, toastOptions);
    }
  };
  return (
    <Container>
      <Typography variant="h3">
        Transporter <span style={{color:"#1565C0"}}>Register</span>
      </Typography>
      <FormControl>
          <InputLabel>Full Name</InputLabel>
          <Input placeholder="Enter name" type="text" name="fullName" onChange={handleChange}  />
        </FormControl>
        <FormControl>
          <InputLabel>Phone</InputLabel>
          <Input placeholder="Enter phone" type="number" name="phone" onChange={handleChange}/>
        </FormControl>
        <FormControl>
          <InputLabel>Address</InputLabel>
          <Input placeholder="Enter Address" type="text" name="address" onChange={handleChange}/>
        </FormControl>
      <FormControl>
          <InputLabel>Email</InputLabel>
          <Input placeholder='Enter email' type='email' name='email' onChange={handleChange} />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input  placeholder='Enter password' type='password' name='password'onChange={handleChange} />
        </FormControl>
            <Link to="/transporter/login"><Button  variant="contained" onClick={handleSubmit} style={{margin:"1rem"}}>Register</Button></Link>
            <p> Already have an account? <Link to="/transporter/login" style={{ textDecoration: "none" }}>
            <span>&nbsp;Login</span></Link></p>
       
      <ToastContainer/>
    </Container>
  )
}

export default TRegister

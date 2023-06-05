import React, { useEffect, useState } from "react";
  import axios from "axios";

  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { Button, FormControl, FormGroup, Input, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from "@mui/material";
 const Container = styled(FormGroup)`
   width:90%;
  display:grid;
margin:2% auto 2% auto;
& > div{
    margin-top:20px;
}
  `;
  const Styltable = styled(Table)`
  width: 80%;
  margin: 50px auto 0 auto;
`;
const Trow = styled(TableRow)`
  background-color: #0e1444;
  & > th {
    color: white;
    font-size: 20px;
  }
`;
const TBR = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;
const ManufacturerDashboard = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [items, setItems] = useState({});
  const [quantity, setQuantity] = useState('');

  const [inputs, setInputs] = useState({
    to: "",
    from: "",
    quantity:"",
    transporter: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  
    if (name === "quantity") {
      setQuantity(value);
    }
  };
  
  let user=JSON.parse(localStorage.getItem("user"))

  const id = user.User._id
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`http://localhost:3001/mDash/${id}`, inputs);
      toast.success(res.data,toastOptions)
      window.location.reload();
 
    } catch (err) {
      toast.error(err.response.data, toastOptions);
    }
  };
  const fetchData = async ()=>{
    try {
      let res= await axios.get("http://localhost:3001/dashboard")
      setItems(res.data)
      
    } catch (error) {
      toast.error(err.response.data, toastOptions);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

return (
 <div>
  <Container>
    <Typography variant="h4">
      Manufacturer <span style={{color:"#1565C0"}}>Register</span>
    </Typography> <div style={{display:"grid","gridTemplateColumns": "auto auto auto auto",gap:"2rem"}}>
    <FormControl>
        <InputLabel>To</InputLabel>
        <Input placeholder="Enter name" type="text" name="to" onChange={handleChange}  />
      </FormControl>
      <FormControl>
        <InputLabel>From</InputLabel>
        <Input placeholder="Enter phone" type="text" name="from" onChange={handleChange}/>
      </FormControl>
      <FormControl variant="standard" sx={{ minWidth: 180 }}>
        <InputLabel name="status">Quantity</InputLabel>
        <Select 
          value={quantity}
          onChange={handleChange}
           label="status"
           name="quantity"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
       
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
       
        </Select>
      </FormControl>
    <FormControl>
        <InputLabel>transporter</InputLabel>
        <Input placeholder='Enter transporter' type='text' name='transporter' onChange={handleChange} />
      </FormControl>
       <Button  variant="contained" onClick={handleSubmit} style={{margin:"1rem"}}>SEND</Button>
  </div>  
  <ToastContainer/>
  </Container>


  <Styltable>
      <TableHead>
        <Trow>
          <TableCell>Order-Id</TableCell>
          <TableCell> To</TableCell>
          <TableCell>From</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Price</TableCell>
        </Trow>
      </TableHead>
      <TableBody>
        
        {items.length == 0 ? (
          <h1>
            no data present<span>!</span>
          </h1>
        ) : (
          Object.entries(items).map((itm, id) => (
            <TBR key={id}>
              <TableCell>{itm[1].orderId}</TableCell>
              <TableCell>{itm[1].to}</TableCell>
              <TableCell>{itm[1].from}</TableCell>
              <TableCell>{itm[1].quantity}</TableCell>
              <TableCell>{itm[1].price}</TableCell>

            </TBR>
          ))
        )}
      </TableBody>
    </Styltable>
    <ToastContainer />
</div>
  )
}

export default ManufacturerDashboard

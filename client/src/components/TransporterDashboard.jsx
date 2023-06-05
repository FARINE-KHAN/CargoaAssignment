import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

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
const TransporterDashboard = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [items, setItems] = useState({});
  const [oneId, setId] = useState({});

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/dashboard");
      setItems(result.data);
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };
  const onedata = async (userr) => {
    try {
      handleClickOpen();
      const result = await axios.get(
        `http://localhost:3001/dashboard/${userr}`
      );
      setId(result.data);
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };
  const [amount, setAmount] = useState({
    price: "",
  });
  const handleChange = (e) => {
    setAmount({ ...amount, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(
        `http://localhost:3001/price/${oneId.orderId}`,
        amount
      );
      handleClose();
      toast.success(res.data,toastOptions)
    } catch (err) {
      toast.error(err.response.data, toastOptions);
    }
  };


  useEffect(() => {  fetchData();
  }, []);

  return (
    <div>
      <Styltable>
        <TableHead>
          <Trow>
            <TableCell>Order-Id</TableCell>
            <TableCell>To</TableCell>
            <TableCell>From</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>

          </Trow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="h5" align="center">
                  No data present!
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            Object.entries(items).map((itm, id) => (
              <TBR key={id}>
                <TableCell>{itm[1].orderId}</TableCell>
                <TableCell>{itm[1].to}</TableCell>
                <TableCell>{itm[1].from}</TableCell>
                <TableCell>{itm[1].quantity}</TableCell>
                <TableCell>{itm[1].price}</TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => onedata
                  (itm[1].orderId)}
                  >
                    Set-Price
                  </Button>
                </TableCell>
              </TBR>
            ))
          )}
        </TableBody>
      </Styltable>
      <ToastContainer />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            width: "40.6vw",
            marginLeft: "",
            marginTop: "20px",
            background: "#0e1444",
            color: "white",
            fontSize: "25px",
          }}
        >
          Insert Price
        </DialogTitle>

        <DialogContent dividers>
          <div>
            <h3 style={{ color: "#0e1444", marginBottom:"0.8rem" }}>
              Order-Id:
              <span
                style={{
                  color: "black",
                  fontSize: "large",
                  marginLeft: "10px",
                }}
              >
                {oneId.orderId}
              </span>
            </h3>
            <h3 style={{ color: "#0e1444", marginBottom:"0.8rem" }}>
              To:
              <span
                style={{
                  color: "black",
                  fontSize: "large",
                  marginLeft: "10px",
                }}
              >
                {oneId.to}
              </span>
            </h3>
            <h3 style={{ color: "#0e1444", marginBottom:"0.8rem" }}>
              From:
              <span
                style={{
                  color: "black",
                  fontSize: "large",
                  marginLeft: "10px",
                }}
              >
                {oneId.from}
              </span>
            </h3>
            <h3 style={{ color: "#0e1444", marginBottom:"0.8rem" }}>
              Quantity:
              <span
                style={{
                  color: "black",
                  fontSize: "large",
                  marginLeft: "10px",
                }}
              >
                {oneId.quantity}
              </span>
            </h3>
            <h3 style={{ color: "#0e1444" }}>
              Price:
              <span
                style={{
                  color: "black",
                  fontSize: "large",
                  marginLeft: "10px",
                }}
              >
                <input
                placeholder={oneId.price}
                  type="number"
                  name="price"
                  value={amount.price} 
                  onChange={handleChange}
                />
              </span>
            </h3>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Send</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransporterDashboard;

import model from "../model/transporterUserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const transporterRegister = async (req, res) => {
  try {
    // console.log(req.files);
    let { fullName, email, phone, password ,address} = req.body;
    if (!fullName) {
      return res.status(400).json("please enter full Name");
    }
    if(!(/^[a-zA-Z ]+$/.test(fullName))){
        return res.status(400).json("only alphabets are allowed")
      }
  
    if (!email) {
      return res.status(400).json("please enter email");
    }
    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))){
        return res.status(400).json("please enter valid email")
    }
    if (!phone) {
        return res.status(400).json("please enter phone number");
      } 
      if(!(/^\d{10}$/.test(phone))){
        return res.status(400).json("incorrect phone number")
      }
      if (!address) {
        return res.status(400).json("please enter address");
      } 
    if (!password) {
      return res.status(400).json("please enter password");
    }
        if(!(/^[a-zA-Z0-9]{8,15}$/.test(password))){
          return res.status(400).json("password must contain only alphabets and numbers minimum 8 and maximum 15 characters")
        }
        
        const dEmailPhone = await model.findOne({ $or: [ { email}, { phone } ]})
        if(dEmailPhone){
          if(dEmailPhone.phone==phone){
      return res.status(400).json("phone number already exist")
          }else{
              return res.status(400).json("email already exist")
          }
        }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const saveData = await model.create(req.body);
    return res.status(201).json(saveData);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const transporterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json("Please enter email address");
    }

    if (!password) {
      return res.status(400).json("Please enter password");
    }

    let User = await model.findOne({ email });
    if (!User) return res.status(401).json("Email or Password is incorrect.");

    let matchPassword = await bcrypt.compare(password, User.password);
    if (!matchPassword)
      return res.status(401).json("Email or Password is incorrect.");
    const token = jwt.sign(
      {
        userId: User._id.toString(),
      },
      "hakunamatata",
      { expiresIn: "5h" }
    );
    // const { newPassword, ...other } = getUser
    // let User = getUser
    // console.log(User)
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ User, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
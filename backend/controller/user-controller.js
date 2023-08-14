import User from '../model/user-model.js';
import bcrypt from 'bcrypt'

import jsonwebtoken from 'jsonwebtoken'

//importing Validations
import { checkingMobileValidation, validateEmail, validatePWD } from "../validations/user-validations.js";

const jwt = jsonwebtoken;

//user id and user's role is passed with token
const createToken = (_id, role) => {
  console.log(process.env.SECRET)
  return jwt.sign({ _id, role }, process.env.secret, { expiresIn: '1hr' })
}

//signup function
const signUp = async (req, res) => {

  const { name, mobile, email, password, role } = req.body;
  //validation for all the input fields
  if (!name || !mobile || !email || !password || !role) {
    return res.status(422).json({ message: "All feilds should be filled" })
  }

  //validation
  if (!checkingMobileValidation(mobile)) {
    return res.status(400).json({ message: "Please provide valid mobile Number with 10 digits" })
  }
  else if (!validateEmail(email)) {
    return res.status(400).json({ message: "Please provide valid Email" })
  }
  else if (!validatePWD(password)) {
    console.log(password)
    return res.status(400).json({ message: "Please provide valid Password" })
  }

  try {
    let existingUser;
    //chaecking whether user already sign up or not based on the email
    try {
      existingUser = await User.findOne({ $or: [{ email: email }, { mobile: mobile }] });
    } catch (err) {
      console.error(err);
    }

    if (existingUser) {
      if (existingUser.email == email) {
        return res.status(409).json({ message: "A User is already signUp with this email" })
      }
      else if (existingUser.mobile == mobile) {
        return res.status(409).json({ message: "A User is already signUp with this mobile" })
      }

    }

    const salt = await bcrypt.genSalt(6)
    //hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(password, salt);

    //creating a new User
    const user = new User({
      name,
      mobile,
      email,
      password: hashedpassword,
      role: role || "customer"
    });

    await user.save();
    return res.status(201).json({ message: "Account Creation is success, Login to your account", User: user })//sending the new user details with token as a message for the response

  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: "Error in saving user in DB" });
  }

}

const login = async (req, res) => {

  const { email, password } = req.body;

  console.log(email, password)

  //checking whether pasword and login fields are filled or not 
  if (!email || !password) {
    return res.status(422).json({ message: "All feilds should be filled" })
  }

  let loggedUser;

  try {
    loggedUser = await User.findOne({ email: email });

    if (!loggedUser) {
      return res.status(404).json({ message: "User is not found. Sign Up instead" })
    }
    //checking password and comare it with exist user's password in the db
    const isPasswordCorrect = bcrypt.compareSync(password, loggedUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" })
    }
    const token = createToken(loggedUser._id, loggedUser.role)

    //Create and setting a cookie with the user's ID and token
    res.cookie(String(loggedUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,//if this option isn't here cookie will be visible to the frontend
      sameSite: "lax"
    })

    //we send this msg along with the token and user details
    return res.status(200).json({ message: "Successfully logged in", User: loggedUser, token })
  } catch (err) {
    console.log(err)
  }


}


//logout function
const logout = (req, res) => {
  const uId = req.userId;//request user Id from the token
  const cookies = req.headers.cookie;//request cookie from the header

  //exttracting token from the cookies
  const previousToken = cookies.split("=")[1];

  //if token is not found return this response
  if (!previousToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  //varifying token using secret key from the environmental variables
  jwt.verify(String(previousToken), process.env.secret, (err) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });//if not verified return this error
    }

    //if token is varified return this success message as response
    res.clearCookie(`${uId}`);
    req.cookies[`${uId}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};


const getOwnAcc = async (req, res) => {

  const userId = req.userId;

  try {

    const user = await User.findById(userId, "-password")

    if (!user) {
      return res.status(404).json({ message: "User is not found" })
    }
    else {
      res.status(200).json({ user })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in getting your Account" })
  }
}


const updateAcc = async (req, res) => {
  const userId = req.userId;
  const { name, mobile, email } = req.body;

  //validation
  if (!checkingMobileValidation(mobile)) {
    return res.status(400).json({ message: "Please provide valid mobile Number with 10 digits" })
  }
  else if (!validateEmail(email)) {
    return res.status(400).json({ message: "Please provide valid Email" })
  }

  try {
    // Check if email or mobile already exist for another user
    const existingUser = await User.findOne({ $or: [{ mobile: mobile }, { email: email }] });
    if (existingUser && existingUser._id != userId) {
      if (Number(existingUser.mobile) === Number(mobile)) {
        return res.status(401).json({ message: "This mobile is already exists. use a different mobile " });
      } else if (existingUser.email === email) {
        return res.status(402).json({ message: "This email is already exists. use a different email " });
      }
    }

    // Update user account
    const user = await User.findByIdAndUpdate(userId,
      {
        name,
        mobile,
        email
      }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User is not found!!!" });
    }
    return res.status(200).json({ message: "User is successfully updated!", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in updating user" });
  }
};

export { signUp, login, logout, getOwnAcc, updateAcc, createToken }
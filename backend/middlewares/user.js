import jsonwebtoken from 'jsonwebtoken'
import { createToken } from '../controller/user-controller.js';

const jwt = jsonwebtoken;

let decode;

//checking user has a valid token
//decoding id, role from the token
const checkToken = async (req, res, next) => {

  try {
    const cookies = req.headers.cookie;

    // console.log(cookies)
    if (!cookies) {
      return res.status(403).json({ message: "Login first" })
    }
    const token = cookies.split("=")[1];

    if (!token) {
      return res.status(403).json({ message: "A token is required" })
    }
    else {
      decode = jwt.verify(token, process.env.secret);

      req.userId = decode._id;

      req.roleIs = decode.role;

      next();
    }

  } catch (err) {
    res.status(401).json({ message: "Invalid Token" })
    console.log(err)
  }

}

const refreshToken = (req, res, next) => {

  const cookie = req.headers.cookie;
  const prevToken = cookie.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ messege: "Could not find any previous tokens." })
  }
  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Authentication is failed!!!" })
    }
    res.clearCookie(`${user.id}`);
    req.cookie[`${user.id}`] = "";

    const token = createToken(user._id, user.role);

    //Create and setting a cookie with the user's ID and token
    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,//if this option isn't here cookie will be visible to the frontend
      sameSite: "lax"
    })

    req.userId = decode._id;

    req.roleIs = decode.role;

    next();
  });
}

const checkAdmin = async (req, res, next) => {

  try {
    if (req.roleIs === "admin") {
      next();
    } else {
      return res.status(403).json("unauthorized")
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json("Error in authorization")
  }

}

export { checkToken, checkAdmin, refreshToken }
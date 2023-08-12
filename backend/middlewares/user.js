import jsonwebtoken from 'jsonwebtoken'

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

export { checkToken }
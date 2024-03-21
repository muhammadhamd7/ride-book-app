import jwt from "jsonwebtoken";
const SECRET = "hamd bhai"
const authenticateUser = (req, res, next) =>{
    const token = req.cookies.Token; // Assuming you store the token in a cookie
    if (token) {
      // Verify and decode the token here (use your actual logic)
      // For example, you can use the 'jsonwebtoken' library
      const decodedData = jwt.verify(token, SECRET);
      if (decodedData.exp > Date.now()) {
        // If the token is valid, set the user data in the request object
        res.cookie('Token', '', {
            maxAge: 1,
            httpOnly: true,
          });
          res.status(401).send("login again")
        return
        }
      if (decodedData) {
        // If the token is valid, set the user data in the request object
        req.body.decodedData = decodedData;
    next(); 

      }
    }

    res.status(401),send({
      message:"user is not login"
    })
  }



export default authenticateUser
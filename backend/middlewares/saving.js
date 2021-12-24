import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'

export const verifyToken = (req, res, next) => {
    const token =
      req.body.accesstoken || req.query.accesstoken || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;      
      console.log('test', decoded);
      if(decoded.id != req.body.userID) return res.status(401).send("User ID and Token are not matched, try login again!");
      
      
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

  export const createSavingValidate = (req, res, next) => {
    if(req.body.balanced < 0) return res.status(403).send("Money Saving can't be negative");
    if(req.body.duration != 30 && req.body.duration != 90 && req.body.duration != 180 && req.body.duration != 270 && req.body.duration != 360 && req.body.duration != 720) return res.status(403).send("Please check duration");
    return next();
  };

    
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
      if(decoded.id != req.body._id) return res.status(403).send("User ID and Token are not matched, try login again!");
      
      
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

  export const depositValidate = (req, res, next) => {
    if(req.body.moneyDeposit < 0) return res.status(403).send("Money deposit can't be negative");
    return next();
  };

  export const withdrawValidate = (req, res, next) => {
    if(req.body.moneyWithdraw < 0) return res.status(403).send("Money withdraw can't be negative");
    return next();
  };

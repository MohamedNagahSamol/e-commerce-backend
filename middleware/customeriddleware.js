const jwt = require("jsonwebtoken");
const customer = require("../module/customermodule");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const Customer = await customer.findById(decoded.id);
    if (!Customer) {
      return res.status(401).json({ message: "no customer" });
    }
    req.customer = Customer;
    next();
  } catch (err) {
    console.log(err);
  }
};


module.exports={requireAuth}
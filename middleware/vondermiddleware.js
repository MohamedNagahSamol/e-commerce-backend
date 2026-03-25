const jwt = require("jsonwebtoken");
const vonder = require("../module/vondermodule");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    var Vonder = await vonder.findById(decoded.id);
    if (!Vonder) {
      return res.status(401).json({ message: "no vonder" });
    }
    req.vonder = Vonder;
    next();
  } catch (err) {
    console.log(err);
  }
};


module.exports={requireAuth}
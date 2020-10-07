const jwt = require("jsonwebtoken");
const secret = "Its a secret ";

module.exports = {
  restrictedMiddleware,
  secret,
  jwt,
};

function restrictedMiddleware(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";
  try {
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          next({ apiCode: 401, apiMessage: "invalid or missing credentials" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      next({ apiCode: 401, apiMessage: "invalid or missing credentials" });
    }
  } catch (err) {
    next({ apiCode: 500, apiMessage: "error validating credentials", ...err });
  }
}

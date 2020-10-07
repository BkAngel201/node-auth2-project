const hashCrypt = require("bcryptjs");
const router = require("express").Router();
const Users = require("../models/users.Model");
const utils = require("../utils/usersUtils");

router.get("/", utils.restrictedMiddleware, (req, res, next) => {
  Users.usersByDepartment({ department: req.headers.department })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      next({
        apiCode: 500,
        apiMessage: "Error getting user info from DB",
        ...err,
      });
    });
});

router.post("/register", (req, res, next) => {
  const body = req.body;

  const passwordWithHash = hashCrypt.hashSync(body.password, 8);
  body.password = passwordWithHash;

  Users.add(body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      next({
        apiCode: 500,
        apiMessage: "Error inserting user info in DB",
        ...err,
      });
    });
});

router.post("/login", async (req, res, next) => {
  const body = req.body;
  try {
    let user = await Users.filterBy({ username: body.username }).first();
    console.log(user);
    if (user && hashCrypt.compareSync(body.password, user.password)) {
      const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
      };

      const options = {
        expiresIn: "2d",
      };

      const token = utils.jwt.sign(payload, utils.secret, options);

      res.status(200).json({ message: "Welcome to the API", token: token });
    } else {
      res.status(401).json({ message: "invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    next({
      apiCode: 500,
      apiMessage: "Error getting user info from DB",
      ...err,
    });
  }
});

module.exports = router;

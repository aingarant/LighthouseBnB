const bcrypt = require("bcrypt");

module.exports = function (router, database) {
  // Create a new user
  router.post("/", (req, res) => {
    const user = req.body;

    if (!user.email || !user.name || !user.password) {
      return res.status(400).send("All 3 fileds must be field in.");
    }

    user.password = bcrypt.hashSync(user.password, 12);
    database
      .addUser(user)
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.send("🤗");
      })
      .catch((e) => res.send(e));
  });

  const login = function (email, password) {
    if (!email || !password) {
      return res.status(400).send("All 2 fileds must be field in.");
    }
    return database.getUserWithEmail(email).then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };
  exports.login = login;

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All 2 fileds must be field in.");
    }

    login(email, password)
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.send({ user: { name: user.name, email: user.email, id: user.id } });
      })
      .catch((e) => res.send(e));
  });

  router.post("/logout", (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.status(401).send({ message: "not logged in" });
      return;
    }

    database
      .getUserWithId(userId)
      .then((user) => {
        if (!user) {
          res.send({ error: "no user with that id" });
          return;
        }

        res.send({ user: { name: user.name, email: user.email, id: userId } });
      })
      .catch((e) => res.send(e));
  });

  return router;
};

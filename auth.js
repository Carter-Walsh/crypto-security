const bcrypt = require("bcrypt");
const { create } = require("domain");

const users = [];

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const matched = bcrypt.compareSync(password, users[i].password);
        if (users[i].username === username && matched) {
            const secureUser = { ...users[i] }
            delete secureUser.password;
            res.status(200).send(secureUser);
            return;
        }
      }

      res.status(400).send("User not found.");
    },

    register: (req, res) => {

        const { username, password, email, firstName, lastName } = req.body

        const salt = bcrypt.genSaltSync(5);
        const passwordHash = bcrypt.hashSync(password, salt);

        const createUser = {
            username,
            password: passwordHash,
            email,
            firstName,
            lastName
        }

        users.push(createUser);

        const secureUser = { ...createUser };
        delete secureUser.password;
        console.log('Registering User');
        res.status(200).send(secureUser);
    }
}
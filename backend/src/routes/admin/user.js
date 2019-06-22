const express = require('express');
const router = express.Router();
const specs = require('../../tools/specs');

const User = require('../../models/user');

router.route('/')
  .get(async function (req, res) {
    const user = await User.getByUsername(specs.ADMIN_USERNAME);
    user.password = null;
    return res.send(user);
  })
  .put(async function (req, res) {
    await User.update(req.body)
      .then(() => {
        return res.status(200).send({message: 'User updated successfully'});
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).send({message: 'Updating User failed!'});
      });
  });

module.exports = router;

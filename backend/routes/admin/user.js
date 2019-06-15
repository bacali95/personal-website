const express = require('express');
const router = express.Router();
const specs = require('../../tools/specs');

const User = require('../../models/user');

router.route('/')
  .get(async function (req, res, next) {
    const user = await User.getByUsername(specs.ADMIN_USERNAME);
    user.password = null;
    return res.send(user);
  })
  .put(async function (req, res, next) {
    await User.update(req.body)
      .then(() => {
        return res.status(200).send({message: 'User updated successfully'});
      })
      .catch((error) => {
        return res.status(500).send({message: 'Updating User failed!' + error});
      });
  });

module.exports = router;

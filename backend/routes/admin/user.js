const express = require('express');
const router = express.Router();

const User = require('../../models/user');

router.route('/')
  .get(async function (req, res, next) {
    const users = await User.getAll();
    return res.send(users);
  })
  .post(async function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    await User.create(username, password).catch((err) => {
      return res.status(409).send({message: 'Username is already used!'});
    });
    return res.status(200).send({message: 'User added successfully'});
  });

router.route('/:id')
  .get(async function (req, res, next) {
    const user = await User.getById(req.params.id).catch(() => {
      return res.status(500).send({message: 'User not found!'});
    });
    return res.send(user);
  })
  .put(async function (req, res, next) {
    await User.update(req.params.id, req.body.password).catch(() => {
      return res.status(500).send({message: 'Updating User failed!'});
    });
    return res.status(200).send({message: 'User updated successfully'});
  })
  .delete(async function (req, res, next) {
    await User.remove(req.params.id).catch(() => {
      return res.status(500).send({message: 'Deleting User failed!'});
    });
    return res.status(200).send({message: 'User deleted successfully'});
  });

module.exports = router;

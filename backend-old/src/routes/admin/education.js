const express = require('express');
const router = express.Router();
const sortList = require('../../tools/utils').sortList;

const Education = require('../../models/education');

router.route('/')
  .get(async function (req, res) {
    const educations = await Education.getAll();
    await sortList(educations, 'asc');
    return res.send(educations);
  })
  .post(async function (req, res) {
    const education = new Education(req.body);

    await Education.create(education).catch((error) => {
      console.log(error.message);
      return res.status(409).send({message: 'Adding Education failed!'});
    });
    return res.status(200).send({message: 'Education added successfully'});
  });

router.route('/:id')
  .get(async function (req, res) {
    const education = await Education.getById(req.params.id).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Education not found!'});
    });
    return res.send(education);
  })
  .put(async function (req, res) {
    const _id = req.params.id;
    const education = new Education(req.body);

    await Education.update(_id, education).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Updating Education failed!'});
    });
    return res.status(200).send({message: 'Education updated successfully'});
  })
  .delete(async function (req, res) {
    await Education.remove(req.params.id).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Deleting Education failed!'});
    });
    return res.status(200).send({message: 'Education deleted successfully'});
  });

module.exports = router;

const express = require('express');
const router = express.Router();
const sortList = require('../../tools/utils').sortList;

const Skill = require('../../models/skill');

router.route('/')
  .get(async function (req, res) {
    const skills = await Skill.getAll();
    await sortList(skills, 'asc');
    return res.send(skills);
  })
  .post(async function (req, res) {
    const skill = new Skill(req.body);

    await Skill.create(skill).catch((error) => {
      console.log(error.message);
      return res.status(409).send({message: 'Adding Skill failed!'});
    });
    return res.status(200).send({message: 'Skill added successfully'});
  });

router.route('/:id')
  .get(async function (req, res) {
    const skill = await Skill.getById(req.params.id).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Skill not found!'});
    });
    return res.send(skill);
  })
  .put(async function (req, res) {
    const _id = req.params.id;
    const skill = new Skill(req.body);

    await Skill.update(_id, skill).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Updating Skill failed!'});
    });
    return res.status(200).send({message: 'Skill updated successfully'});
  })
  .delete(async function (req, res) {
    await Skill.remove(req.params.id).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Deleting Skill failed!'});
    });
    return res.status(200).send({message: 'Skill deleted successfully'});
  });

module.exports = router;

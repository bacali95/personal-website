const express = require('express');
const router = express.Router();

const Category = require('../../models/category');

router.route('/')
  .get(async function (req, res) {
    const categories = await Category.getAll();
    return res.send(categories);
  })
  .post(async function (req, res) {
    const name = req.body.name;
    const category = new Category({name});

    await Category.create(category).catch((error) => {
      console.log(error.message);
      return res.status(409).send({message: 'Adding Category failed!'});
    });
    return res.status(200).send({message: 'Category added successfully'});
  });

router.route('/:id')
  .get(async function (req, res) {
    const category = await Category.getById(req.params.id).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Category not found!'});
    });
    return res.send(category);
  })
  .put(async function (req, res) {
    const _id = req.params.id;
    const name = req.body.name;
    const category = new Category({_id, name});

    await Category.update(_id, category).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Updating Category failed!'});
    });
    return res.status(200).send({message: 'Category updated successfully'});
  })
  .delete(async function (req, res) {
    await Category.remove(req.params.id).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Deleting Category failed!'});
    });
    return res.status(200).send({message: 'Category deleted successfully'});
  });

module.exports = router;

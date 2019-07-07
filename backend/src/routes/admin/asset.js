const express = require('express');
const router = express.Router();
const sortList = require('../../tools/utils').sortList;

const Asset = require('../../models/asset');

router.route('/')
  .get(async function (req, res) {
    const assets = await Asset.getAll();
    await sortList(assets, 'asc');
    return res.send(assets);
  })
  .post(async function (req, res) {
    const asset = new Asset(req.body);

    await Asset.create(asset).catch((error) => {
      console.log(error.message);
      return res.status(409).send({message: 'Adding Asset failed!'});
    });
    return res.status(200).send({message: 'Asset added successfully'});
  });

router.route('/:id')
  .get(async function (req, res) {
    const asset = await Asset.getById(req.params.id).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Asset not found!'});
    });
    return res.send(asset);
  })
  .put(async function (req, res) {
    const _id = req.params.id;
    const asset = new Asset(req.body);

    await Asset.update(_id, asset).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Updating Asset failed!'});
    });
    return res.status(200).send({message: 'Asset updated successfully'});
  })
  .delete(async function (req, res) {
    await Asset.remove(req.params.id).catch((error) => {
      console.log(error.message);
      return res.status(500).send({message: 'Deleting Asset failed!'});
    });
    return res.status(200).send({message: 'Asset deleted successfully'});
  });

module.exports = router;

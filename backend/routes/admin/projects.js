const express = require('express');
const router = express.Router();

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  uploadDir: './public/images/for_compress'
});

const CompressTool = require('../../tools/compress');
const deleteImage = require('../../tools/utils').deleteImage;
const specs  = require('../../tools/specs');

const Project = require('../../models/project');

const compress = CompressTool();

router.route('/')
  .get(async function (req, res, next) {
    const projects = await Project.getAll();
    return res.send(projects);
  })
  .post(async function (req, res, next) {
    const project = new Project(req.body);

    await Project.create(project).catch(() => {
      return res.status(409).send({message: 'Project is already used!'});
    });

    return res.status(200).send({message: 'Project added successfully'});
  });

router.route('/:id')
  .get(async function (req, res, next) {
    const project = await Project.getById(req.params.id).catch(() => {
      return res.status(500).send({message: 'Project not found!'});
    });

    return res.send(project);
  })
  .put(async function (req, res, next) {
    const project = await Project.getById(req.params.id).catch(() => {
      return res.status(500).send({message: 'Project not found!'});
    });

    const newProject = new Project(req.body);

    project.images.forEach(function (image) {
      const found = newProject.images.find(function (item) {
        return item.secure_url === image.secure_url;
      });
      if (!found) {
        deleteImage(image.public_id);
      }
    });

    await Project.update(newProject._id, newProject).catch(() => {
      return res.status(500).send({message: 'Updating Project failed!'});
    });

    return res.status(200).send({message: 'Project updated successfully'});
  })
  .delete(async function (req, res, next) {
    const project = await Project.getById(req.params.id).catch(() => {
      return res.status(500).send({message: 'Project not found!'});
    });

    await Project.remove(req.params.id).catch(() => {
      return res.status(500).send({message: 'Deleting Project failed!'});
    });

    project.images.forEach(function (image) {
      deleteImage(image.public_id);
    });

    return res.status(200).send({message: 'Project deleted successfully'});
  });

router.post('/postImage', multipartMiddleware, function (req, res, next) {
  const file = req.files.uploads[0];
  compress.begin(file, {
    folder: `personal_website/${specs.ENV}`
  }, function (error, image) {
    if (error) {
      return res.status(500).send({message: error});
    }
    return res.send(image);
  });
});

module.exports = router;

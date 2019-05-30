const express = require('express');
const router = express.Router();

const CompressTool = require('../../tools/compress');
const deleteImage = require('../../tools/utils').deleteImage;
const sortProjects = require('../../tools/utils').sortProjects;
const upload = require('../../tools/utils').upload;

const Project = require('../../models/project');

const compress = CompressTool();

router.route('/')
  .get(async function (req, res, next) {
    const projects = await Project.getAll();
    return res.send(projects);
  })
  .post(async function (req, res, next) {
    // const title = req.body.title;
    // const description = req.body.description;
    // const type = req.body.type;
    // const categories = req.body.categories;
    // const startDate = req.body.startDate;
    // const finishDate = req.body.finishDate;
    // const repoGithub = req.body.repoGithub;
    // const images = JSON.parse(req.body.images);
    //
    // await images.sort(function (a, b) {
    //   const x = a.original_filename.toLowerCase();
    //   const y = b.original_filename.toLowerCase();
    //   if (x < y) {
    //     return -1;
    //   }
    //   if (x > y) {
    //     return 1;
    //   }
    //   return 0;
    // });
    //
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
    // const title = req.body.title;
    // const description = req.body.description;
    // const type = req.body.type;
    // const categories = req.body.categories;
    // const startDate = req.body.startDate;
    // const finishDate = req.body.finishDate;
    // const repoGithub = req.body.repoGithub;
    // const images = JSON.parse(req.body.images);
    //
    // const newProject = new Project({
    //   _id: req.params.id,
    //   title,
    //   description,
    //   type,
    //   categories,
    //   period: {
    //     start: startDate,
    //     finish: finishDate
    //   },
    //   repoGithub,
    //   creationDate: Date.now(),
    //   images: []
    // });
    //
    // const project = await Project.getById(req.params.id).catch(() => {
    //   return res.status(500).send({message: 'Project not found!'});
    // });
    //
    // project.images.forEach(function (image) {
    //   const found = images.find(function (item) {
    //     return item.secure_url === image.secure_url;
    //   });
    //   if (!found) {
    //     deleteImage(image.public_id);
    //   } else {
    //     newProject.images.push(image);
    //   }
    // });
    //
    // images.forEach(function (image) {
    //   const found = newProject.images.find(function (element) {
    //     return element.secure_url === image.secure_url;
    //   });
    //   if (!found) {
    //     newProject.images.push(image);
    //   }
    // });
    //
    // await newProject.images.sort(function (a, b) {
    //   const x = a.original_filename.toLowerCase();
    //   const y = b.original_filename.toLowerCase();
    //   if (x < y) {
    //     return -1;
    //   }
    //   if (x > y) {
    //     return 1;
    //   }
    //   return 0;
    // });
    console.log(req.body);

    const project = new Project(req.body);

    await Project.update(project._id ,project).catch(() => {
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
      delete
        deleteImage(image.public_id);
    });

    return res.status(200).send({message: 'Project deleted successfully'});
  });

router.post('/postimage', upload, function (req, res, next) {
  const ID = req.body.ID;
  const filename = req.file.filename;
  compress.begin(filename, {tags: ['project']}, function (error, image) {
    if (error) {
      throw error;
    }
    res.send({ID, image});
  });
});

module.exports = router;

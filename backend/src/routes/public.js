const express = require('express');
const router = express.Router();
const specs = require('../tools/specs');
const sortProjects = require('../tools/utils').sortProjects;
const sortList = require('../tools/utils').sortList;

const User = require('../models/user');
const Project = require('../models/project');
const Category = require('../models/category');
const Education = require('../models/education');
const Skill = require('../models/skill');

/* GET home page. */
router.get('/', async function (req, res) {
  const educations = await Education.getAll();
  const skills = await Skill.getAll();
  const categories = await Category.getAll();
  const projects = await Project.getAll();

  await sortProjects(projects);
  await sortList(educations);
  await sortList(skills, 'asc');

  const user = await User.getByUsername(specs.ADMIN_USERNAME);

  return res.render('public/sections', {
    title: 'Nasreddine Bac Ali',
    layout: 'layout',
    user,
    projects,
    categories,
    educations,
    skills
  });
});

router.get('/project/:id', async function (req, res) {
  const project = await Project.getById(req.params.id).catch(() =>
    res.redirect('/#portfolio')
  );

  if (!project) {
    return res.redirect('/');
  }
  project.clicks++;
  project.save();

  return res.render('public/showProject', {
    title: project.title,
    index: req.query.index,
    project
  });
});

router.get('/next/:index', async function (req, res) {
  const projects = await Project.getAll();
  await sortProjects(projects);

  let index = req.params.index;
  if (!index || isNaN(index)) {
    index = 0;
  }

  index = projects.length + Number(index);
  index %= projects.length;
  const _id = projects[index]._id;
  return res.redirect('/project/' + _id + '?index=' + index);
});

router.get('/*', function (req, res, next) {
  const regex = /^((\/next)|(\/project)|(\/images)|(\/api))/g;
  if (!String(req.url).match(regex)) {
    return res.redirect('/');
  }
  return next();
});

module.exports = router;

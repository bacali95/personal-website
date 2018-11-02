var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.lan || req.session.lan === 'en') {
        return res.redirect('/en');
    } else {
        return res.redirect('/fr');
    }
});

router.get('/en', function (req, res, next) {
    req.session.lan = 'en';
    return res.render('public/en/sections', {
        title: 'Nasreddine Bac Ali',
        layout: 'layout'
    });
});

router.get('/fr', function (req, res, next) {
    req.session.lan = 'fr';
    return res.render('public/fr/sections', {
        title: 'Public',
        layout: 'layout'
    });
});

router.get('/*', function (req, res, next) {
    if (!String(req.url).startsWith('/admin')){
        return res.redirect('/');
    }
    return next();
});

module.exports = router;

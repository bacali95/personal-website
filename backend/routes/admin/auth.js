const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.post('/login', function (req, res, next) {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occured');
                return next(error);
            }
            req.login(user, {session: false}, async (error) => {
                if (error) {
                    return next(error);
                }
                const body = {_id: user._id, username: user.username};
                const token = jwt.sign({user: body}, 'top_secret', {expiresIn: 60 * 20});
                return res.json({token});
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.get('/logout', function (req, res, next) {
    res.status(200).send({auth: false});
});

module.exports = router;

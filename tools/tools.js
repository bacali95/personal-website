module.exports = {
    ensureAuthenticated : function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/admin/login');
    }
};
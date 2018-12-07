module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/admin/login?fromURL=" + req.originalUrl);
};


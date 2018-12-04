const createError = require("http-errors");
const express = require("express");
const path = require("path");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const favicon = require("serve-favicon");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const helmet = require("helmet");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const initAdmin = require("./tools/initAdmin");
const specs = require("./tools/specs");

require("./models/user");
require("./models/category");
require("./models/project");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(specs.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}, initAdmin);

const publicRouter = require("./routes/public");
const authRouter = require("./routes/admin/auth");
const usersRouter = require("./routes/admin/users");
const projectsRouter = require("./routes/admin/projects");
const categoriesRouter = require("./routes/admin/categories");
const app = express();

app.locals.moment = require("moment");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Helmet
app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Handle express sessions
app.use(session({
    secret: "bacalisecret",
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge: 20 * 60 * 1000}
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(expressValidator({
    errorFormatter(param, msg, value) {
        let namespace = param.split(".")
            , root = namespace.shift()
            , formParam = root;
        while (namespace.length) {
            formParam += "[" + namespace.shift() + "]";
        }
        return {
            param: formParam,
            msg,
            value
        };
    }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//favicon
app.use(favicon(path.join(__dirname, "public", "images", "favicon.png")));

app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require("express-messages")(req, res);
    next();
});

app.use("/", publicRouter);
app.use("/project", publicRouter);
app.use("/admin", authRouter);
app.use("/admin/user", usersRouter);
app.use("/admin/project", projectsRouter);
app.use("/admin/category", categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

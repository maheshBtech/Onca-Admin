var express = require("express");
var cookieParser = require("cookie-parser");
const path = require("path");
const validateAuth = require("./src/loaders/validateAuth");
var winston = require("./src/config/winston");
//routes
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var loginRouter = require('./src/routes/login');
var logoutRouter = require('./src/routes/logout');
var authRouter = require('./src/routes/auth');
var roleRouter = require('./src/routes/role');
var ping = require('./src/routes/ping');
var alertDataRouter = require('./src/routes/Dashboard/AlertData');
var logDataRouter = require('./src/routes/Dashboard/LogData');
var AcitvityGraphRouter = require('./src/routes/Dashboard/ActivityGraph');
var RevenueGraphRouter = require('./src/routes/Dashboard/RevenueGraph');
var NewLeadGraphRouter = require('./src/routes/Dashboard/NewLeadGraph');
var NewRegistrationGraphRouter = require('./src/routes/Dashboard/NewRegistrationGraph');
var CardsRouter = require('./src/routes/Dashboard/Cards');
var navigationDataRouter = require('./src/routes/navigationData')
var activityRouter = require('./src/routes/activity');
var groupDataRouter = require('./src/routes/groupData');
var newVendorRouter = require('./src/routes/Ecom/newVendor');
var Provider = require('./src/routes/provider');
var userTypeRouter = require('./src/routes/Pugmark-routes/userType');
var PugmarkRequestRouter = require('./src/routes/Pugmark-routes/PugmarkRequest');
var PugmarkSegmentRouter = require('./src/routes/Pugmark-routes/PugmarkSegment');
var mailer = require('./src/routes/mailer')
var leaderboard = require('./src/routes/leaderboard');
var noAuthAPI = require('./src/routes/noValidationAPI');
var brand = require('./src/routes/Ecom/brand');
var category = require('./src/routes/Ecom/category');
var subCategory = require('./src/routes/Ecom/subCategory');
var location = require('./src/routes/Settings/location');
var predefinedStr = require('./src/routes/Settings/PredefinedStr');
var email = require('./src/routes/communication/Email');
var distance = require('./src/routes/Settings/distance');
var promocode = require('./src/routes/Finance/Promocode');
var uniqueID = require('./src/routes/Settings/uniqueID')
var faq = require('./src/routes/communication/faq');
var wishes = require('./src/routes/communication/wishes');
var blogs = require("./src/routes/Onca-Bites/blog");

//other dependencies
var morgan = require("morgan");
var passport = require("passport");
const environment = require("./src/config/environment");
var apiRoot = environment.getApi();

var app = express();
var cors = require("cors");
const withAuth = require("./src/routes/middlewares/isAuth"); //for checking auth
app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//adding cors with credentials and originto resolve cookie issue
app.use(
  cors({
    origin: environment.getClientAppUrl(),
    preflightContinue: true,
    maxAge: 86400,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
//app.enable('trust proxy');
var bodyParser = require("body-parser");

// This will manage our sessions
//app.use(sessionHandler());
// use JWT auth to secure the api
app.use(`${apiRoot}noAuth`, noAuthAPI);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(validateAuth); //added for checkin auth validation via header
app.use(`${apiRoot}index`, indexRouter);
app.use(`${apiRoot}user`, usersRouter);
app.use(`${apiRoot}login`, loginRouter);
app.use(`${apiRoot}auth`, authRouter);
app.use(`${apiRoot}ping`, ping);
app.use(`${apiRoot}dashboard/alertData`, alertDataRouter);
app.use(`${apiRoot}dashboard/logData`, logDataRouter);
app.use(`${apiRoot}dashboard/activityGraph`, AcitvityGraphRouter);
app.use(`${apiRoot}dashboard/revenueGraph`, RevenueGraphRouter);
app.use(`${apiRoot}dashboard/newLeadGraph`, NewLeadGraphRouter);
app.use(`${apiRoot}dashboard/newRegistrationGraph`, NewRegistrationGraphRouter);
app.use(`${apiRoot}dashboard/cardDashboard`, CardsRouter);
app.use(`${apiRoot}logout`, logoutRouter);
app.use(`${apiRoot}role/data`, roleRouter);
app.use(`${apiRoot}navigationData/data`, navigationDataRouter);
app.use(`${apiRoot}activity/data`, activityRouter);
app.use(`${apiRoot}groupData/data`, groupDataRouter);
app.use(`${apiRoot}provider/add`, Provider);
app.use(`${apiRoot}provider/get`, Provider);
app.use(`${apiRoot}pugmark/usertype/data`, userTypeRouter);
app.use(`${apiRoot}pugmark/pugmarkrequest/data`, PugmarkRequestRouter);
app.use(`${apiRoot}pugmark/pugmarksegment/data`, PugmarkSegmentRouter)
app.use(`${apiRoot}mailer/go`, mailer);
// app.use(`${apiRoot}`, leaderboard);
app.use(`${apiRoot}leaderboard`, leaderboard);
app.use(`${apiRoot}ecom/data`, newVendorRouter);
app.use(`${apiRoot}`, leaderboard);
app.use(`${apiRoot}ecom/data`, brand);
app.use(`${apiRoot}ecom/data`, category);
app.use(`${apiRoot}ecom/data`, subCategory);
app.use(`${apiRoot}setting/data`, location);
app.use(`${apiRoot}setting/predefinedStr/data`, predefinedStr);
app.use(`${apiRoot}communication/email/data`, email);
app.use(`${apiRoot}setting/distance/data`, distance);
app.use(`${apiRoot}finance/promocode/data`, promocode);
app.use(`${apiRoot}setting/uniqueID`, uniqueID);
app.use(`${apiRoot}setting/distance/data`, distance);
app.use(`${apiRoot}comm/faq/data`, faq);
app.use(`${apiRoot}comm/wishes/data`, wishes);
app.use(`${apiRoot}oncaBites/blogs/data`, blogs);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build"))); // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.route("/").get((req, res) => {
  res.send(
    "Hello user, \n  Welcome to Onca Admin - " + environment.getEnvironment()
  );
});
// app.get('/secret', withAuth, function(req, res) {
//     res.send('The password is potato');
//   });
app.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

module.exports = app;

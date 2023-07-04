import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  // code to run on server at startup
});
WebApp.rawConnectHandlers.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

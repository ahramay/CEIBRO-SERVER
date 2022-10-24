const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const chatRoute = require('./chat.route');
const docsRoute = require('./docs.route');
const projectRoute = require('./project.route');
const taskRoute = require('./task.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/chat',
    route: chatRoute,
  },
  {
    path: '/project',
    route: projectRoute,
  },
  {
    path: '/task',
    route: taskRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },

];

defaultRoutes.forEach((routex) => {
  router.use(routex.path, routex.route);
});

module.exports = router;

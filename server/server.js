require('dotenv').config();

const express = require('express')
    , session = require('cookie-session')
    , mongoose = require('mongoose')
    , helmet = require('helmet')
    , chalk = require('chalk');

const seed = require('./seed');
const middleware = require('./middleware');
const controllers = require('./controllers');

const app = express();

const cookieName = 'ua-session';
app.use(helmet());
app.use(express.json());
app.use(session({
   name: cookieName,
   secret: process.env.SESSION_SECRET,
   secure: !process.env.DEV,
}));
app.use(middleware.rememberUser);
app.use(middleware.logRequest);

mongoose.connect(process.env.MONGOOSE_CONNECTION, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
   console.log(chalk.magenta('mongoose connected to database'));
   // seed(db);
   listen();
});

/* ///// AUTH ///// */
app.get('/login/:uid', (req, res) => {
   req.session.uid = req.params.uid;
   req.session.remember = req.query.remember === 'true';
   res.send('logged in');
});
app.post('/login', (req, res) => {
   req.session.uid = req.body.uid;
   req.session.remember = req.body.remember;
   res.sendStatus(200);
});
app.get('/session', middleware.checkAuth, (req, res) => {
   if (req.session.pageViews) {
      req.session.pageViews++;
      res.send(`You have visited ${req.session.pageViews} times. uid: ${req.session.uid}`);
   } else {
      req.session.pageViews = 1;
      res.send(`Welcome to this page for the first time. uid: ${req.session.uid}`);
   }
});
app.get('/logout', (req, res) => {
   req.session = null;
   res.clearCookie(cookieName);
   res.send('You have been logged out');
});

/* ///// GAMES ///// */
app.get('/games', controllers.game.getAllGames);
app.get('/games/:id', controllers.game.getUserGames);
app.get('/game/key/:key', controllers.game.getGameByGameKey);

function listen() {
   const port = process.env.PORT || 8081;
   const portChalk = chalk.cyan.underline;
   app.listen(port, () => {
      console.log(portChalk(`eavesdropping_on_port_${port}`));
   });
}

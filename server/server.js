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
app.get('/session', middleware.checkAuth, controllers.auth.testSession);
app.get('/auth/session', controllers.auth.checkSession);
app.post('/auth/login', controllers.auth.login);
app.post('/auth/logout', (req, res) => controllers.auth.logout(req, res, cookieName));

/* ///// GAMES ///// */
app.get('/games', controllers.game.getAllGames);
app.get('/games/:id', controllers.game.getUserGames);

/* ///// GAME ///// */
app.get('/game/key/:key', controllers.game.getGameByGameKey);
app.get('/game/relation/:gameId', controllers.game.getGameRelation);
app.post('/game', middleware.checkAuth, controllers.game.createGame);

function listen() {
   const port = process.env.PORT || 8081;
   const portChalk = chalk.cyan.underline;
   app.listen(port, () => {
      console.log(portChalk(`eavesdropping_on_port_${port}`));
   });
}

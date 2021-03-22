require('dotenv').config();

const express = require('express')
    , session = require('cookie-session')
    , mongoose = require('mongoose')
    , helmet = require('helmet')
    , chalk = require('chalk');

const seed = require('./seed');
const controllers = require('./controllers');

const app = express();

app.use(helmet());
app.use(express.json());

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

app.get('/', (_, res) => res.status(200).send('Hello world'));

/* GAMES */
app.get('/games', controllers.game.getAllGames);
app.get('/games/:id', controllers.game.getUserGames);

function listen() {
   const port = process.env.PORT || 8081;
   const portChalk = chalk.cyan.underline;
   app.listen(port, () => {
      console.log(portChalk(`eavesdropping_on_port_${port}`));
   });
}

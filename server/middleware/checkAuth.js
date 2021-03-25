const chalk = require('chalk');

module.exports = (req, res, next) => {
   const { uid } = req.session;
   if (!uid) {
      console.log(chalk.red.underline('Session auth failed.'));
      res.status(401).send('You are not authorized to access this endpoint.');
   } else next();
};

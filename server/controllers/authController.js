module.exports = {
   login: (req, res) => {
      req.session.uid = req.body.uid;
      req.session.remember = req.body.remember;
      res.sendStatus(200);
   },

   checkSession: (req, res) => {
      if (req.session.checks) ++req.session.checks;
      else req.session.checks = 1;
      res.send(`${req.session.checks} checks`);
   },

   logout: (req, res, cookieName) => {
      req.session = null;
      res.clearCookie(cookieName);
      res.status(200).send('Logout success.');
   },
};
